import { Reports, Users, Profiles } from "../models/index.js";
import { Op } from "sequelize";

// Create a new report
export const createReport = async (req, res) => {
  try {
    const reporter_id = req.user?.id || req.body.reporter_id;
    const { reported_user_id, reason, description } = req.body;

    if (!reporter_id || !reported_user_id || !reason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reporter, reported user, and reason are required",
      });
    }

    if (Number(reporter_id) === Number(reported_user_id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot report your own profile",
      });
    }

    const report = await Reports.create({
      reporter_id: Number(reporter_id),
      reported_user_id: Number(reported_user_id),
      reason: reason.trim(),
      description: description ? description.trim() : null,
      status: "pending",
    });

    // Fetch created report with associated users for return
    const createdReport = await Reports.findByPk(report.id, {
      include: [
        {
          model: Users,
          as: "reporter",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "reportedUser",
          attributes: ["id", "name", "email", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report: createdReport || report,
    });
  } catch (error) {
    console.error("Create report error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all reports with user details and admin moderation stats
export const getReports = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;

    const where = {};
    if (status && status !== "All") {
      const normalizedStatus = status.toLowerCase().replace(/[\s-]/g, "_");
      if (normalizedStatus === "pending") where.status = "pending";
      else if (normalizedStatus === "in_review" || normalizedStatus === "review") where.status = "in_review";
      else if (normalizedStatus === "resolved") where.status = "resolved";
      else if (normalizedStatus === "dismissed") where.status = "dismissed";
      else if (normalizedStatus === "action_taken") where.status = "action_taken";
      else where.status = normalizedStatus;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: reports } = await Reports.findAndCountAll({
      where,
      include: [
        {
          model: Users,
          as: "reporter",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "reportedUser",
          attributes: ["id", "name", "email", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: Number(offset),
    });

    // Compute admin moderation KPI metrics
    const allReports = await Reports.findAll({
      attributes: ["id", "status"],
    });

    const totalReports = allReports.length;
    const pendingCount = allReports.filter((r) => r.status === "pending").length;
    const inReviewCount = allReports.filter((r) => r.status === "in_review").length;
    const resolvedCount = allReports.filter((r) => r.status === "resolved").length;
    const actionTakenCount = allReports.filter(
      (r) => r.status === "action_taken" || r.status === "dismissed"
    ).length;

    return res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
      stats: {
        totalReports,
        pending: pendingCount,
        inReview: inReviewCount,
        resolved: resolvedCount,
        actionTaken: actionTakenCount,
      },
      reports,
    });
  } catch (error) {
    console.error("Get reports error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Reports.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          as: "reporter",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "reportedUser",
          attributes: ["id", "name", "email", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
      ],
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      report,
    });
  } catch (error) {
    console.error("Get report by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update report details or status (supports both /:id and /:id/status)
export const updateReport = async (req, res) => {
  try {
    const report = await Reports.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const { status, action_taken, reason, description } = req.body;

    // Normalize status if string provided directly
    let newStatus = status;
    if (typeof status === "string") {
      const s = status.toLowerCase().replace(/[\s-]/g, "_");
      if (["pending", "in_review", "resolved", "dismissed", "action_taken"].includes(s)) {
        newStatus = s;
      }
    }

    await report.update({
      ...(newStatus !== undefined && { status: newStatus }),
      ...(action_taken !== undefined && { action_taken }),
      ...(reason !== undefined && { reason: reason.trim() }),
      ...(description !== undefined && { description: description?.trim() }),
    });

    // Re-fetch with associations
    const updatedReport = await Reports.findByPk(report.id, {
      include: [
        {
          model: Users,
          as: "reporter",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "reportedUser",
          attributes: ["id", "name", "email", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture", "city"],
              required: false,
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report: updatedReport || report,
    });
  } catch (error) {
    console.error("Update report error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await Reports.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await report.destroy();

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Delete report error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Bulk delete reports
export const deleteBulkReports = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Array of report IDs is required",
      });
    }

    await Reports.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Reports deleted successfully",
    });
  } catch (error) {
    console.error("Bulk delete reports error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

import { Reports } from "../models/index.js";

export const createReport = async (req, res) => {
  try {
    const { reporter_id, reported_user_id, reason } = req.body;

    if (!reporter_id || !reported_user_id || !reason?.trim()) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const report = await Reports.create({
      reporter_id,
      reported_user_id,
      reason: reason.trim(),
    });

    return res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Reports.findAll();

    return res.status(200).json({
      message: "Reports fetched successfully",
      reports,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Reports.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    return res.status(200).json({
      message: "Report fetched successfully",
      report,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await Reports.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    const { reporter_id, reported_user_id, reason } = req.body;

    const updatedReport = await report.update({
      ...(reporter_id !== undefined && { reporter_id }),
      ...(reported_user_id !== undefined && { reported_user_id }),
      ...(reason !== undefined && { reason }),
    });

    return res.status(200).json({
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Reports.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    await report.destroy();

    return res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

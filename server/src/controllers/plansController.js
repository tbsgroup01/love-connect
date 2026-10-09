import { Plans } from "../models/index.js";
import { initialPlansData } from "../seeders/planSeeder.js";
import { Op } from "sequelize";

const createPlans = async (req, res) => {
  try {
    const { plan_id, name, price, duration, description, features, status } = req.body;
    if (
      !name ||
      price === undefined ||
      price === null ||
      duration === undefined ||
      duration === null ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const plan = await Plans.create({
      plan_id: plan_id || Math.floor(100000 + Math.random() * 900000),
      name,
      price,
      duration,
      description,
      features: features || null,
      status: status || "active",
    });
    const { ...planData } = plan.toJSON();
    return res.status(201).json({
      message: "Plans created successfully",
      plan: planData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getPlans = async (req, res) => {
  try {
    const plans = await Plans.findAll({
      order: [["duration", "ASC"]],
    });
    return res.status(200).json({
      message: "Plans fetched successfully",
      plans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getPlansById = async (req, res) => {
  try {
    const planId = req.params.plan_id || req.params.id;
    const plan = (await Plans.findByPk(planId)) || (await Plans.findOne({ where: { plan_id: planId } }));
    if (!plan) {
      return res.status(404).json({
        message: "Plans not found",
      });
    }
    return res.status(200).json({
      message: "Plans fetched successfully",
      plan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updatePlans = async (req, res) => {
  try {
    const planId = req.params.plan_id || req.params.id;
    const plan = (await Plans.findByPk(planId)) || (await Plans.findOne({ where: { plan_id: planId } }));
    if (!plan) {
      return res.status(404).json({
        message: "Plans not found",
      });
    }
    const updatedPlan = await plan.update(req.body);
    return res.status(200).json({
      message: "Plans updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const deletePlans = async (req, res) => {
  try {
    const planId = req.params.plan_id || req.params.id;
    const plan = (await Plans.findByPk(planId)) || (await Plans.findOne({ where: { plan_id: planId } }));
    if (!plan) {
      return res.status(404).json({
        message: "Plans not found",
      });
    }
    await plan.destroy();
    return res.status(200).json({
      message: "Plans deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const seedPlans = async (req, res) => {
  try {
    const validPlanIds = initialPlansData.map((p) => p.plan_id);
    const validDurations = initialPlansData.map((p) => p.duration);
    await Plans.destroy({
      where: {
        [Op.or]: [
          { duration: { [Op.notIn]: validDurations } },
          { plan_id: { [Op.notIn]: validPlanIds } },
        ],
      },
    });

    let insertedCount = 0;
    let existingCount = 0;

    for (const item of initialPlansData) {
      const existing = await Plans.findOne({
        where: {
          [Op.or]: [{ plan_id: item.plan_id }, { name: item.name }, { duration: item.duration }],
        },
      });

      if (!existing) {
        await Plans.create(item);
        insertedCount++;
      } else {
        await existing.update({
          name: item.name,
          price: item.price,
          duration: item.duration,
          description: item.description,
          features: item.features,
          status: item.status,
        });
        existingCount++;
      }
    }

    const plans = await Plans.findAll({
      order: [["duration", "ASC"]],
    });

    return res.status(200).json({
      message: `Plans seeded successfully (${insertedCount} new added, ${existingCount} synced)`,
      plans,
      insertedCount,
      existingCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error while seeding Plans",
      error: error.message,
    });
  }
};

export {
  createPlans,
  createPlans as createPlan,
  getPlans,
  getPlansById,
  getPlansById as getPlanById,
  updatePlans,
  updatePlans as updatePlan,
  deletePlans,
  deletePlans as deletePlan,
  seedPlans,
};


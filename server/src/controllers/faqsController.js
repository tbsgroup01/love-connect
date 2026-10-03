import { Faqs } from "../models/index.js";
import { initialFaqsData } from "../seeders/faqSeeder.js";

const normalizeStatus = (status) => {
  if (!status) return "active";
  if (status === "Published" || status === "active") return "active";
  if (status === "Draft" || status === "inactive") return "inactive";
  return "active";
};

const createFaqs = async (req, res) => {
  try {
    const { faq_id, question, answer, category, status } = req.body;
    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required",
      });
    }
    const faq = await Faqs.create({
      faq_id: faq_id || Math.floor(100000 + Math.random() * 900000),
      question,
      answer,
      category: category || "General",
      status: normalizeStatus(status),
    });
    const { ...faqData } = faq.toJSON();
    return res.status(201).json({
      message: "Faqs created successfully",
      faq: faqData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFaqs = async (req, res) => {
  try {
    const faqs = await Faqs.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json({
      message: "Faqs fetched successfully",
      faqs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFaqsById = async (req, res) => {
  try {
    const faqId = req.params.faq_id || req.params.id;
    const faq =
      (await Faqs.findOne({
        where: {
          ...(isNaN(faqId) ? {} : { id: faqId }),
        },
      })) ||
      (await Faqs.findOne({
        where: { faq_id: faqId },
      }));
    if (!faq) {
      return res.status(404).json({
        message: "Faqs not found",
      });
    }
    return res.status(200).json({
      message: "Faqs fetched successfully",
      faq,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateFaqs = async (req, res) => {
  try {
    const faqId = req.params.faq_id || req.params.id;
    const faq =
      (await Faqs.findByPk(faqId)) ||
      (await Faqs.findOne({ where: { faq_id: faqId } }));
    if (!faq) {
      return res.status(404).json({
        message: "Faqs not found",
      });
    }

    const updatePayload = { ...req.body };
    if (updatePayload.status) {
      updatePayload.status = normalizeStatus(updatePayload.status);
    }

    const updatedFaq = await faq.update(updatePayload);
    return res.status(200).json({
      message: "Faqs updated successfully",
      faq: updatedFaq,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteFaqs = async (req, res) => {
  try {
    const faqId = req.params.faq_id || req.params.id;
    const faq =
      (await Faqs.findByPk(faqId)) ||
      (await Faqs.findOne({ where: { faq_id: faqId } }));
    if (!faq) {
      return res.status(404).json({
        message: "Faqs not found",
      });
    }
    await faq.destroy();
    return res.status(200).json({
      message: "Faqs deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const seedFaqs = async (req, res) => {
  try {
    let insertedCount = 0;
    let existingCount = 0;

    for (const item of initialFaqsData) {
      const existing = await Faqs.findOne({
        where: { question: item.question },
      });

      if (!existing) {
        await Faqs.create(item);
        insertedCount++;
      } else {
        existingCount++;
      }
    }

    const faqs = await Faqs.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      message: `Initial FAQs seeded successfully (${insertedCount} new added, ${existingCount} already existed)`,
      faqs,
      insertedCount,
      existingCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error while seeding FAQs",
      error: error.message,
    });
  }
};

export {
  createFaqs,
  createFaqs as createFaq,
  getFaqs,
  getFaqsById,
  getFaqsById as getFaqById,
  updateFaqs,
  updateFaqs as updateFaq,
  deleteFaqs,
  deleteFaqs as deleteFaq,
  seedFaqs,
};



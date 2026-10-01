import { Faqs } from "../models/index.js";

const createFaqs = async (req, res) => {
  try {
    const { faq_id, question, answer, category, status } = req.body;
    if (!question || !answer || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const faq = await Faqs.create({
      faq_id: faq_id || Math.floor(100000 + Math.random() * 900000),
      question,
      answer,
      category,
      status: status || "active",
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
    const faqs = await Faqs.findAll();
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
    const faq = await Faqs.findOne({
      where: {
        ...(isNaN(faqId) ? {} : { id: faqId }),
      },
    }) || await Faqs.findOne({
      where: { faq_id: faqId },
    });
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
    const faq = (await Faqs.findByPk(faqId)) || (await Faqs.findOne({ where: { faq_id: faqId } }));
    if (!faq) {
      return res.status(404).json({
        message: "Faqs not found",
      });
    }
    const updatedFaq = await faq.update(req.body);
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
    const faq = (await Faqs.findByPk(faqId)) || (await Faqs.findOne({ where: { faq_id: faqId } }));
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
};


const mongoose = require("mongoose");
const FAQ = require("../models/FAQ");

async function createFAQ(req, res, next) {
  try {
    const { question, answer, category } = req.body;
    const faq = await FAQ.create({ question, answer, category, createdBy: req.user._id });
    res.status(201).json({ success: true, message: "FAQ created successfully", faq });
  } catch (error) {
    next(error);
  }
}

async function listFAQs(req, res, next) {
  try {
    const faqs = await FAQ.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    res.json({ success: true, count: faqs.length, faqs });
  } catch (error) {
    next(error);
  }
}

async function searchFAQs(req, res, next) {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return res.status(400).json({ success: false, message: "Search query q is required" });

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const faqs = await FAQ.find({
      $or: [{ question: regex }, { answer: regex }, { category: regex }]
    }).sort({ createdAt: -1 });

    res.json({ success: true, query: q, count: faqs.length, faqs });
  } catch (error) {
    next(error);
  }
}

async function updateFAQ(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid FAQ id" });
    }
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

    if (String(faq.createdBy) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "You can update only your own FAQs" });
    }

    Object.assign(faq, req.body);
    await faq.save();
    res.json({ success: true, message: "FAQ updated successfully", faq });
  } catch (error) {
    next(error);
  }
}

async function deleteFAQ(req, res, next) {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

    if (String(faq.createdBy) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "You can delete only your own FAQs" });
    }

    await faq.deleteOne();
    res.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { createFAQ, listFAQs, searchFAQs, updateFAQ, deleteFAQ };

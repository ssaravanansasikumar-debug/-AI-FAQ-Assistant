const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createFAQ, listFAQs, searchFAQs, updateFAQ, deleteFAQ
} = require("../controllers/faqController");

router.get("/", listFAQs);
router.get("/search", searchFAQs);
router.post("/", protect, createFAQ);
router.put("/:id", protect, updateFAQ);
router.delete("/:id", protect, deleteFAQ);

module.exports = router;

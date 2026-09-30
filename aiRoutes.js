const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { generateFAQ } = require("../controllers/aiController");

router.post("/generate-faq", protect, generateFAQ);

module.exports = router;

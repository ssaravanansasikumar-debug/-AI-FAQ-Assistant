const { GoogleGenAI } = require("@google/genai");

async function generateFAQ(req, res, next) {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ success: false, message: "topic is required" });

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        source: "fallback-demo",
        generatedAt: new Date().toISOString(),
        faq: {
          topic,
          generatedQuestion: `What is ${topic} and how can it improve a support workflow?`,
          generatedAnswer: `${topic} can be improved by applying clear schemas, validation, indexing and efficient runtime workflows. These practices make FAQ data easier to maintain and retrieve.`,
          generatedCategory: "Technical Support"
        }
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Generate one FAQ for this topic: "${topic}". Return only valid JSON with keys generatedQuestion, generatedAnswer, generatedCategory.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    let parsed;
    try {
      parsed = JSON.parse(response.text);
    } catch {
      parsed = {
        generatedQuestion: "What is this topic?",
        generatedAnswer: response.text,
        generatedCategory: "General"
      };
    }

    res.json({
      success: true,
      source: "google-gemini",
      generatedAt: new Date().toISOString(),
      faq: { topic, ...parsed }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { generateFAQ };

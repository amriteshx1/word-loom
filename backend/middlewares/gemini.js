require('dotenv').config();
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
exports.upgradeTone = async(req, res) => {

    const { content, tone } = req.body;

    if (!content || !tone) {
      return res.status(400).json({ error: "Content and tone are required." });
    }
  
    const prompt = `You are a professional writing assistant that rewrites blog content in a specified tone while preserving the original meaning, structure, and flow. The output should be a single, polished version of the content rewritten in a ${tone.toLowerCase()} tone. Maintain proper paragraph breaks, formatting, and readability suitable for publishing. Do not include multiple options, explanations, or introductory text — only return the transformed content.

        Original content:
        """
        ${content}
        """`;

    
    try {
    const model = genAI.getGenerativeModel({  model: "gemini-2.5-flash-preview-04-17" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ transformed: text });
    } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate content." });
  }
}
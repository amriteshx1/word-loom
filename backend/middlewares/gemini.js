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
  
    const prompt = `You're a skilled human writer rewriting a blog post in a ${tone.toLowerCase()} tone. Keep the original meaning, structure, and message intact, but rewrite it to sound more authentic, engaging, and natural — as if written by a thoughtful, expressive human. Keep the formatting clean and paragraph breaks intact, and make sure it's ready to publish. 

        Just return the rewritten content — no extra commentary or explanation.
        
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
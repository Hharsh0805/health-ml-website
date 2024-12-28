const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to interact with Gemini API
app.post('/api/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Initialize Gemini AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate content from Gemini model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Send back the generated response
    res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ message: 'Error generating response', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

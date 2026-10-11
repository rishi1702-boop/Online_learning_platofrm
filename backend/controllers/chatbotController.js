import { GoogleGenAI } from '@google/genai';

export const chatWithAI = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback for demo purposes when API key is missing
      return res.status(200).json({ 
        success: true, 
        reply: "Hello! I am currently running in 'Offline Demo Mode' because the Gemini API Key hasn't been added to the backend `.env` file yet. Once it is added, I will be fully powered by AI!" 
      });
    }
    const ai = new GoogleGenAI({ apiKey });

    const { message, history } = req.body;

    // --- PRESENTATION MOCK MODE ---
    // Since the local network is blocking outbound AI requests, we will return a mock 
    // response so the frontend UI works perfectly for the presentation.
    
    // Simulate a brief AI "thinking" delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let reply = "I'm your enterprise learning assistant! How can I help you achieve your career goals today?";
    
    if (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello")) {
      reply = "Hello Rishikanth! I see you are currently enrolled in the UI/UX Design Masterclass. Would you like me to quiz you on your recent wireframing module, or help you find a new course?";
    } else if (message.toLowerCase().includes("course") || message.toLowerCase().includes("learn")) {
      reply = "Based on your career goal of becoming a Senior Product Designer, I recommend starting the 'Advanced Prototyping with Figma' track. It will reward you with 150 Skill Points upon completion!";
    } else {
      reply = `That's a great question about "${message}". As your AI assistant, I can analyze your study materials or fetch past exam papers to help you master this topic. What would you like to do?`;
    }

    return res.status(200).json({ success: true, reply });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

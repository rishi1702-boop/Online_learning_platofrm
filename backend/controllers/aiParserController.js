import { GoogleGenAI } from '@google/genai';
import mongoose from 'mongoose';
import { Course } from '../models/Course.js';

export const generateTopicMaterials = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: "GEMINI_API_KEY is not configured on the server." });
    }
    const ai = new GoogleGenAI({ apiKey });

    const { courseId, nodeId, rawTextSource } = req.body;

    const prompt = `
      You are an expert curriculum design engineer. Analyze the following raw reference text or historical exam paper.
      Extract two highly structured outputs:
      1. A condensed, bullet-pointed Revision Note optimized for rapid memory recall.
      2. Three target core technical skills mentioned.
      
      Return the output strictly as a clean JSON object following this format:
      {
        "revisionNotes": "String formatted in clean Markdown syntax",
        "skillsExtracted": ["Skill1", "Skill2", "Skill3"]
      }
      
      Raw Text Material:
      ${rawTextSource}
    `;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const structuredData = JSON.parse(aiResponse.text);

    // Persist the AI-generated gamified assets directly into the Mongoose sub-document node
    await Course.updateOne(
      { _id: courseId, "topicNodes.nodeId": nodeId },
      { 
        $set: { 
          "topicNodes.$.revisionNotes": structuredData.revisionNotes,
          "topicNodes.$.skillsTagged": structuredData.skillsExtracted
        } 
      }
    );

    return res.status(200).json({ success: true, data: structuredData });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

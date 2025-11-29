import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTERVIEW_PROMPT } from "@/constant/constant";

export const aiService = async (prompt) => {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);

  return result;
};

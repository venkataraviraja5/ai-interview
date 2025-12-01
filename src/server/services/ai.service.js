import { GoogleGenerativeAI } from "@google/generative-ai";
import AppError from "@/utils/appError";

export const aiService = async (prompt) => {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);

  if(!result) throw new AppError('Ai response not generated',500)

  return result;
};

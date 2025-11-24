import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTERVIEW_PROMPT } from "@/constant/constant";

export const aiService = async (resume) => {
  const finalPrompt = `
    ${INTERVIEW_PROMPT}

    RESUME:
    ${resume}

    Now ask ONLY the next interview question.
    Do NOT explain. Do NOT answer the question.
`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(finalPrompt);

  return result;
};

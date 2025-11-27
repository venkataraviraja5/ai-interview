import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTERVIEW_PROMPT } from "@/constant/constant";

export const aiService = async (resume,prevQuestion,answer) => {
  const finalPrompt = `
    ${INTERVIEW_PROMPT}

    RESUME:
    ${resume}

    Previous Question:
    ${prevQuestion || "None (start of interview)"}

    Candidate's Answer:
    ${answer || "No answer yet"}

    Based on the previous question and the answer given,
    ask ONLY the next interview question. 
    Do NOT explain. 
    Do NOT answer the question yourself. 
    If the interview should end, answer with "END".

    Now ask ONLY the next interview question.
    Do NOT explain. Do NOT answer the question.
`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(finalPrompt);

  return result;
};

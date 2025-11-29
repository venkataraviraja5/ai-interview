import { aiService } from "./ai.service";
import { redis } from "@/lib/redis";
import { INTERVIEW_PROMPT } from "@/constant/constant";

export const generateQuestionsService = async (body) => {
  const { prevQuestion, answer, redisId } = body;

   

  const decodedId = decodeURIComponent(redisId);

  const resume = await redis.get(decodedId);

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


  const result = await aiService(finalPrompt);
  const nextQuestion = result.response.text();

  if (prevQuestion) {
    const qa = JSON.stringify({
      interviewQuestion: prevQuestion,
      userAnswer:answer,
      timestamp: Date.now(),
    });

    const pushed = await redis.lpush(`result:${decodedId}`, qa);

  }


  return nextQuestion;
};

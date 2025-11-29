
import { redis } from "@/lib/redis"
import { RESULT_PROMPT } from "@/constant/constant"
import { aiService } from "./ai.service";

const resultService = async(req) => {
   const body = await req.json()
   const {redisId} = body

   const decodedId = decodeURIComponent(redisId);

   const questionAndAnswersList = await redis.lrange(`result:${decodedId}`,0,-1)

   console.log(questionAndAnswersList,'questoponsssssssssssssssss')

   const formattedQA = questionAndAnswersList.map(item => {
      return `
      **Question:** ${item.interviewQuestion.trim()}
      **Answer:** ${item.userAnswer.trim()}
      `;
   }).join("\n");

   const finalPrompt = RESULT_PROMPT + formattedQA;

   const result = await aiService(finalPrompt);

   return result.response.text()
}

export default resultService
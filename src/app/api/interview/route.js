import { NextResponse } from "next/server";
import { generateQuestionsController } from "../../../server/controllers/interview.controller";
import { catchAsync } from "@/utils/catchAsync";



export const POST = catchAsync(async(req) => {
  const body = await req.json();
  const response = await generateQuestionsController(body);

  return NextResponse.json({
    success: true,
    question: response,
  });
})
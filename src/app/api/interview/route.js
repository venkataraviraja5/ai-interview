import { NextResponse } from "next/server";
import { generateQuestionsController } from "../../../server/controllers/interview.controller";

export async function POST(req) {
  const body = await req.json();
  const response = await generateQuestionsController(body);

  return NextResponse.json({
    success: true,
    question: response,
  });
}

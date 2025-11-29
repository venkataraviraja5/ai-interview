import resultController from "@/server/controllers/result.controller";
import { NextResponse } from "next/server";

export async function POST(req) {
    const result =  await resultController(req)

    return NextResponse.json({
    success: true,
    result:result
  });
}
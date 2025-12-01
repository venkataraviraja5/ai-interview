import resultController from "@/server/controllers/result.controller";
import { NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";


export const POST = catchAsync(async(req) => {
  const result =  await resultController(req)

    return NextResponse.json({
    success: true,
    result:result
  });
})


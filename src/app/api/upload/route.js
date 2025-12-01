import { NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";
import { uploadController } from "@/server/controllers/upload.controller";

export const runtime = "nodejs";


export const POST = catchAsync(async (req) => {
  const result = await uploadController(req);

  return NextResponse.json({
    success: true,
    message: 'Resume uploaded successfully',
    data: result
  });
});
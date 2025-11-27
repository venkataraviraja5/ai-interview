import { NextResponse } from "next/server";
import { extractText } from "unpdf";
import { uploadController } from "@/server/controllers/upload.controller";

export const runtime = "nodejs";

export async function POST(req) {
  // try {
  //   const form = await req.formData();
  //   const file = form.get("resume");

  //   if (!file) {
  //     return NextResponse.json({
  //       success: false,
  //       message: "No file uploaded",
  //     });
  //   }

  //   const arrayBuffer = await file.arrayBuffer();

  //   const uint8 = new Uint8Array(arrayBuffer);

  //   // Extract text
  //   const result = await extractText(uint8);

  //   let text = result.text || "";

  //   console.log(text,'texttttttttttttt')


  //   return NextResponse.json({
  //     success: true,
  //     text: text,
  //   });
  // } catch (err) {
  //   return NextResponse.json(
  //     { success: false, message: err.message },
  //     { status: 500 }
  //   );
  // }

  try{
    const result = await uploadController(req)
      return NextResponse.json({
      success: true,
      message:'Resume uploaded successfull',
      data:result
    });
  }
  catch(err){
      return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { extractText } from "unpdf";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("resume");

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Convert incoming file → ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Convert ArrayBuffer → Uint8Array (🔥 REQUIRED FOR unpdf)
    const uint8 = new Uint8Array(arrayBuffer);

    // Extract text
    const result = await extractText(uint8);

    let text = result.text || "";

    console.log(text,'texttttttttttttt')

    // Format vertical
    // const vertical = text
    //   .split(/\r?\n/)
    //   .map((line) => line.trim())
    //   .filter((line) => line.length > 0)
    //   .join("\n");

    return NextResponse.json({
      success: true,
      text: text,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

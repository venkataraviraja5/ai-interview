import { redis } from "@/lib/redis";
import { extractText } from "unpdf";
import { nanoid } from 'nanoid';
import AppError from "@/utils/appError";

export const uploadService = async (req) => {
  const form = await req.formData();
  const file = form.get("resume");

  if(!file) throw new AppError('File not found',404)

  const arrayBuffer = await file.arrayBuffer();

  const uint8 = new Uint8Array(arrayBuffer);

  // Extract text
  const result = await extractText(uint8);

  let text = result.text || "";

  const redisKey = `resume:${nanoid()}`

  await redis.set(redisKey,text,{ ex: 3600 })

  // console.log(text, "texttttttttttttt");

  return redisKey
};

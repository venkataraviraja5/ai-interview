import { redis } from "@/lib/redis";


export async function GET() {
  // SET value
  await redis.set("username", "raviraja");

  // GET value
  const value = await redis.get("username");

  return Response.json({
    message: "Redis Connected Successfully!",
    data: value,
  });
}
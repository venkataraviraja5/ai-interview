
import { uploadService } from "../services/upload.service"

export const uploadController = async(req) => {
  const result = await uploadService(req)

  return result
}
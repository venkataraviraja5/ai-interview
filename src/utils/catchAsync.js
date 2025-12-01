import { errorHandler } from "./errorHandler";

export const catchAsync = (handler) => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      return errorHandler(err);
    }
  };
};

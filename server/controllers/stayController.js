import asyncHandler from "../utils/asyncHandler.js";
import { searchStays } from "../services/stayService.js";

const searchStayController = asyncHandler(async (request, response) => {
  const result = await searchStays(request.query);

  response.status(200).json(result);
});

export { searchStayController };

import { ApiResponse } from "../utils/ApiResponse.js";

const heathCheck = (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "OK", "Heath Check Passed!!"));
};

export { heathCheck };

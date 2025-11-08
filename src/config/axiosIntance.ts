import axios from "axios";

import config from "./config.ts";

export const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 60000,
});

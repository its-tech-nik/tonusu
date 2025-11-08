export const API_CONFIG = {
  baseUrl: import.meta.env.MODE === "production" ? import.meta.env.VITE_API_URL : "http://localhost:8000",
  endpoints: {
    summary: "/agentic-summary",
  },
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.endpoints) => {
  return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
};

// utils/api.js

export async function apiCall(
  endpoint: string,
  method = "GET",
  data: any = null
) {
  const url = `http://localhost:3000/api${endpoint}`;

  const options: RequestInit = {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      // Add other headers if needed (e.g., Authorization)
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("API call error:", error.message);
    } else {
      console.error("API call error:", error);
    }
    throw error;
  }
}

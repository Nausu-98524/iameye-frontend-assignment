// utils/fetchData.js
const BASE_URL = "http://localhost:8080/api/v1";
//const BASE_URL = "https://iameye-backend-assignment.onrender.com/api/v1";

const fetchData = async (url, body = {}, method = "POST") => {
  try {
    const token = localStorage.getItem("token");

    const headers = {};

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(BASE_URL + url, {
      method,
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
  }
};

export default fetchData;

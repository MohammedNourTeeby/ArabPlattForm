// api/axiosInstance.js
import axios from "axios";

const STRAPI_URL = "http://localhost:1337"; // تأكد من أن Strapi يعمل على هذا المنفذ

const apiClient = axios.create({
  baseURL: STRAPI_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة التوكن تلقائيًا في كل طلب (فقط في المكونات التي تحتوي على 'use client')
if (typeof window !== "undefined") {
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default apiClient;

import axios from "axios";

const api = axios.create({
  baseURL: "https://graph.facebook.com/v10.0/me/",
});

export default api;
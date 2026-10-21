import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

export const api = {
  login: (data) => axios.post("/user/login", data),
  register: (data) => axios.post("/user/register", data),
  logout: () => axios.get("/user/logout"),

  createNote: (data) => axios.post("/note/create", data),
  getNotes: () => axios.get("/get-note"),
  updateNote: (id, data) => axios.put(`/note/update/${id}`, data),
  deleteNote: (id) => axios.delete(`/note/delete/${id}`),
};

export default api;
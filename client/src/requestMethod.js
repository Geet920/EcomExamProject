import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjg5OWY2YWM1NWZlYjMwNjhhNzAzMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDQ1OTU0NiwiZXhwIjoxNjYwNzE4NzQ2fQ.83W0VOddNcx5xdN_u7EaYvnD7saxw1UIVLfAQlJm728";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${token}` },
});

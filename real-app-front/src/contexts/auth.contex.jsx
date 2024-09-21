import { useAuth } from "../contexts/auth.context";
import httpService, { setDefaultCommonHeaders } from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

refreshToken();

function refreshToken() {
  setDefaultCommonHeaders("x-auth-token", getJWT());
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function createUser(user) {
  try {
    return httpService.post("/users", user);
  } catch (error) {
    console.log(error);
  }
}

export async function login(credentials) {
  const response = await httpService.post("users/login", credentials);
  setToken(response.data);
  return response;
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function logout() {
  setToken(null);
}

export function getMe(userID) {
  const token = getJWT();
  return httpService.get(`/users/${userID}`, token);
}

export function updateUser(userId, data) {
  return httpService.put(`/users/${userId}`, data);
}

export function getAllUsers() {
  return httpService.get("/users");
}
export function getSingleUser(id) {
  return httpService.get(`/users/${id}`);
}
export function deleteUser(id) {
  return httpService.delete(`/users/${id}`);
}
export function editBizUser(id) {
  return httpService.patch(`/users/${id}`);
}

const usersService = {
  createUser,
  login,
  getUser,
  logout,
  getMe,
  getJWT,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  editBizUser,
};

export default usersService;

import { createContext, useContext, useState } from "react";
import usersService from "../services/usersService";

const fn_error_context_must_be_used = () => {
  throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
  user: null,
  login: fn_error_context_must_be_used,
  logout: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
  getLoggedUser: fn_error_context_must_be_used,
  editLoggedUser: fn_error_context_must_be_used,
  allUsers: fn_error_context_must_be_used,
  getUserByID: fn_error_context_must_be_used,
  deleteUserByID: fn_error_context_must_be_used,
  editBizUser: fn_error_context_must_be_used,
});
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(usersService.getUser());

  const refreshUser = () => setUser(usersService.getUser());

  const login = async (credentials) => {
    const response = await usersService.login(credentials);
    refreshUser();

    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  const getLoggedUser = async (id) => {
    const response = await usersService.getMe(id);
    return response;
  };

  const editLoggedUser = async (id, data) => {
    const response = await usersService.updateUser(id, data);
    return response;
  };
  const allUsers = async () => {
    const response = await usersService.getAllUsers();
    return response;
  };
  const getUserByID = async (id) => {
    const response = await usersService.getSingleUser(id);
    return response;
  };
  const deleteUserByID = async (id) => {
    const response = await usersService.deleteUser(id);
    return response;
  };
  const editBizUser = async (id) => {
    const response = await usersService.editBizUser(id);
    return response;
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        signUp: usersService.createUser,
        getLoggedUser,
        editLoggedUser,
        allUsers,
        getUserByID,
        deleteUserByID,
        editBizUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

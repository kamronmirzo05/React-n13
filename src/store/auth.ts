import { create } from "zustand";
import Cookies from "js-cookie";
import { devtools } from "zustand/middleware";
import { NavigateFunction } from "react-router-dom";

import request from "../server";
import User from "../types/user";
import Login from "../types/login";
import { TOKEN, USER } from "../constants";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  login: (values: Login, navigate: NavigateFunction) => void;
}

const useAuth = create<AuthState>()(
  devtools((set) => ({
    isAuthenticated: Boolean(Cookies.get(TOKEN)),
    user: localStorage.getItem(USER)
      ? JSON.parse(localStorage.getItem(USER) || "")
      : null,
    login: async (values, navigate) => {
      const {
        data: { token, user },
      } = await request.post("auth/login", values);
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      set((state) => ({ ...state, isAuthenticated: true, user }));
      navigate("/crud");
    },
  }))
);

export default useAuth;

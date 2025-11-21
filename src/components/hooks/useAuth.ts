import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  type AuthUser,
} from "@/store/authSlice";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  globalname: string;
  birthdate: string;
};

interface AuthState {
  user: AuthUser | null;
  status: string;
  error: string | null;
  initialized: boolean;
}

interface UseAuthResponse {
  user: AuthUser | null;
  status: string;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (payload: LoginPayload) => Promise<unknown>;
  register: (payload: RegisterPayload) => Promise<unknown>;
  logout: () => Promise<unknown>;
  refresh: () => void;
}

export const useAuth = (): UseAuthResponse => {
  const dispatch = useAppDispatch();
  const { user, status, error, initialized } = useAppSelector((state) => state.auth as AuthState);

  const login = useCallback(
    (payload: LoginPayload) => dispatch(loginUser(payload)).unwrap(),
    [dispatch]
  );

  const register = useCallback(
    (payload: RegisterPayload) => dispatch(registerUser(payload)).unwrap(),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(logoutUser()).unwrap(), [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return useMemo(
    () => ({
      user,
      status,
      loading: status === "loading",
      error,
      initialized,
      login,
      register,
      logout,
      refresh,
    }),
    [user, status, error, initialized, login, register, logout, refresh]
  );
};

export default useAuth;


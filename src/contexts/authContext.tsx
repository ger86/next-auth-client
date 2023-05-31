"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AuthTokens = {
  token: string;
  refresh_token: string;
};

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export const AuthContext = createContext({
  login: (authTokens: AuthTokens) => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const authTokensInLocalStorage = window.localStorage.getItem(AUTH_TOKENS_KEY);
  const [authTokens, setAuthTokens] = useState(
    authTokensInLocalStorage === null
      ? null
      : JSON.parse(authTokensInLocalStorage)
  );

  const login = useCallback(function (authTokens: AuthTokens) {
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authTokens));
    setAuthTokens(authTokens);
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null,
    }),
    [authTokens, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

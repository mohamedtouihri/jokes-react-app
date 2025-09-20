import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { axiosInstance } from "../lib/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/me");
      console.log(response.data);
      return response.data;
    },
    retry:1,
  });

  const value = {
    data,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Spin } from "antd";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth() as { data: any; isLoading: boolean };
  const isConnected = auth.data;
  const isLoading = auth.isLoading;

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen={true} />;
  }

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

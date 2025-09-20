import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Spin } from "antd";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useAuth();
  const isConnected = data;

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen={true} />;
  }

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

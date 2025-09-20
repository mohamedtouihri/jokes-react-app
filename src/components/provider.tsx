import { ConfigProvider } from "antd";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  );
};

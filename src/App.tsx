import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./components/provider";
import "@ant-design/v5-patch-for-react-19";
import { App as AppAnt } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider>
        <AppAnt>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AppAnt>
      </ThemeProvider>
    </>
  );
}

export default App;

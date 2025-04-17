import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/themes/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import LocationPage from "./pages/LocationPage";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/location/:cityName" element={<LocationPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </BrowserRouter>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;

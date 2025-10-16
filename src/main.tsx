import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@src/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConversationProvider } from "@src/socket/context-socket";
// import {GoogleOA}
// const queryClient = new QueryClient();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    },
    mutations: {
      retry: false,
      gcTime: 60 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <ConversationProvider> */}
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="87769859451-tebrsf944prkkn588l7nlu3o8290ukf3.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
    {/* </ConversationProvider> */}
  </BrowserRouter>,
);

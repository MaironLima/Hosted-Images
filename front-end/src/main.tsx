import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from 'react-router-dom'
import queryClient from "./services/queryClient";
import { router } from "./routes/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

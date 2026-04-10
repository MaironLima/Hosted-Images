import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorElement from "../pages/ErrorElement";
import MainPage from "../pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
    ],
  },


]);
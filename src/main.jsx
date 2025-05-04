import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import Root from "./layouts/Root.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import SignIn from "./pages/SignIn.jsx";
import Faq from "./pages/FAQ.jsx";
import MyNotes from "./pages/MyNotes.jsx";
import TodoPage from "./pages/TodoPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "my-notes",
        element: <MyNotes />,
      },
      {
        path: "todo-list",
        element: <TodoPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

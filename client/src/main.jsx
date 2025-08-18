import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthRoute } from "./components/AuthRoute.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import Chat from "./components/Chat.jsx";
import IndexRedirect from "./components/IndexRedirect.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexRedirect />} />
            <Route
              path="login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

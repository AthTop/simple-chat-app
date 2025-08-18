import { useState, useEffect } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router";
import AuthForm from "./AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await onLogin(formData);
  };

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await login({ username, password });
      const { data } = response;
      if (!data.success) {
        setError(data.message);
        return;
      }
      setError();
      setUser(data.user);
    } catch (e) {
      if (e.response) {
        console.error(
          "Server responded with",
          e.response.status,
          e.response?.data?.message
        );
        setError(e.response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  });

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>

        <AuthForm
          fields={[
            { label: "Username", name: "username", type: "text" },
            { label: "Password", name: "password", type: "password" },
          ]}
          submitLabel="Log in"
          onSubmit={handleSubmit}
          error={error}
        />

        <p className="mt-4 text-sm text-center">
          No Account?{" "}
          <button
            onClick={onRegister}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

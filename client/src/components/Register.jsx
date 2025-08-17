import { useState } from "react";
import { useNavigate } from "react-router";
import AuthForm from "./AuthForm";
import { register } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onRegister(formData);
  };

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    try {
      const response = await register({ username, password, confirmPassword });
      const { data } = response;
      if (!data.success) {
        setError(data.message);
        return;
      }
      setError();
      navigate("/login");
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

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <AuthForm
          fields={[
            { label: "Username", name: "username", type: "text" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm password",
              name: "confirmPassword",
              type: "password",
            },
          ]}
          submitLabel="Register"
          onSubmit={handleSubmit}
          error={error}
        />

        <p className="mt-4 text-sm text-center">
          Have an account?{" "}
          <button onClick={onLogin} className="text-blue-500 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    isLogin
      ? { email: "", password: "" }
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
  );

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      console.log(
        `${isLogin ? "Logging in" : "Registering"} with data:`,
        formData
      );
      const endpoint = isLogin ? "/login" : "/register";
      const response = await api.post(endpoint, formData);

      if (isLogin) {
        const token = response.data.token;
        if (!token) {
          setError("Invalid credentials");
          return;
        }
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error(
        `${isLogin ? "Login" : "Registration"} error:`,
        err.response?.data || err
      );
      setError(
        err.response?.data?.message ||
          `${isLogin ? "Login" : "Registration"} failed.`
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={`auth-container ${isLogin ? "" : "register"}`}>
      <div className="auth-card">
        <h1 className="auth-title">{isLogin ? "Login" : "Register"}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="register-form-group">
                <label className="register-label">First Name</label>
                <input
                  className="register-input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="register-form-group">
                <label className="register-label">Last Name</label>
                <input
                  className="register-input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </>
          )}

          <div className="login-form-group">
            <label>Email</label>
            <input
              className="login-input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="register-form-group">
              <label className="register-label">Confirm Password</label>
              <input
                className="register-input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            className={`auth-button ${isLogin ? "" : "register"}`}
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

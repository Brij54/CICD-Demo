import Login1 from "./Login1";
import "../../App.css";
import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext, User } from "../../context/LoginContext";
import { login } from "../../apis/backend";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(LoginContext);
  const [formData, setFormData] = useState<User>({
    email_id: "",
    password: "",
  });
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = () => emailRegex.test(formData.email_id);
  const isPasswordValid = () => formData.password.length >= 6;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lowerCaseEmail = formData.email_id.toLowerCase();
    
    setFormData((prev) => ({ ...prev, email_id: lowerCaseEmail }));
    setUser(formData); // Move this inside handleSubmit

    if (!isEmailValid()) {
      setError("Invalid email format");
      return;
    }
    
    if (!isPasswordValid()) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (lowerCaseEmail === "admin@rasp.com" && formData.password === "admin@123") {
      try {
        const ssid = await login(formData);
        if (ssid) {
          sessionStorage.setItem("key", ssid);
          setIsLoggedIn(true);
          navigate("/page1");
        }
      } catch (error) {
        setError("Login failed. Please try again.");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Login1
      formData={formData}
      setFormData={setFormData}
      error={error}
      setError={setError}
      handleSubmit={handleSubmit}
      isEmailValid={isEmailValid}
      isPasswordValid={isPasswordValid}
    />
  );
};

export default Login;

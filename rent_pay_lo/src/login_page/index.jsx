import React, { useState } from "react";
import illustration from "../assets/images/image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const isProd = import.meta.env.PROD;
      const url = isProd
        ? "https://api.rentpeylo.com/oauth/token"
        : "/api/oauth/token";
      const response = await axios.post(url, {
        grant_type: "password",
        username: email,
        password: password,
        role: "customer",
        email: email,
      });
      if (response.status === 200) {
        const { access_token, first_name } = response.data;
        localStorage.setItem("rentpeylo_token", access_token);
        localStorage.setItem("rentpeylo_user_name", first_name);
        navigate("/home");
      }
    } catch (error) {
      const apiError =
        error.response?.data?.error || "Invalid email or password";
      setPasswordError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-900 p-4">
      <div className="absolute top-4 left-6 z-10 ">
        <span
          style={{
            fontFamily: '"Freckle Face", "Freckle Face Fallback", cursive',
            fontSize: "42px",
            lineHeight: "50px",
            color: "#ff5555",
            fontWeight: "bold",
          }}
        >
          RentPeylo
        </span>
      </div>
      <div className="bg-white/10 rounded-4xl shadow-4xl max-w-6xl w-full grid md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="bg-white/10 flex flex-col justify-center items-center text-white p-8 md:p-12 space-y-4">
          <img
            src={illustration}
            alt="Illustration"
            className="max-w-[240px] md:max-w-xs mb-4"
          />
          <h2 className="text-2xl font-semibold text-center leading-snug">
            Discover a smarter way to rent appliances
          </h2>
          <p className="text-base text-center opacity-80">
            Fast, secure, and convenient.
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-white  md:rounded-tr-2xl md:rounded-br-2xl flex flex-col justify-center relative">
          <p
            className="absolute top-8 left-0 text-sm sm:text-base font-medium text-white py-2 sm:py-3 px-4 sm:px-6 rounded-tr-2xl rounded-br-2xl shadow-md"
            style={{
              background: "linear-gradient(to right,#8e59dd, #4447AD)",
            }}
          >
            Welcome back 👋
          </p>

          <div className="p-6 sm:p-10 md:p-12">
            <div className="pt-12 mt-10">
              <span
                style={{
                  fontFamily:
                    '"Freckle Face", "Freckle Face Fallback", cursive',
                  fontSize: "34px",
                  lineHeight: "50px",
                  color: "#ff5555",
                  fontWeight: "bold",
                }}
              >
                RentPeylo
              </span>

              <p
                className="text-sm font-medium mt-2"
                style={{ color: "#FF5B53" }}
              >
                Login your account
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col mt-10">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition placeholder-gray-400 shadow-sm"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
              <div className="relative mt-5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border border-gray-300 rounded-md px-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition placeholder-gray-400 shadow-sm w-full"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                disabled={loading}
                className="text-white py-2 px-6 mt-10 rounded-md transition shadow-md hover:opacity-90 self-center flex items-center justify-center"
                style={{
                  background: "linear-gradient(to right, #FF5B5399, #FF5B53)",
                  width: "fit-content",
                  opacity: loading ? 0.7 : 1,
                  minWidth: "120px",
                  height: "42px",
                }}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-20 text-sm text-center space-y-2">
              <p>
                <span className="text-gray-500">Don't have an account?</span>{" "}
                <a
                  href="#"
                  className="text-red-500 font-medium hover:underline"
                >
                  Create Account
                </a>
              </p>
              <a
                href="#"
                className="text-red-400 text-xs hover:underline block"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

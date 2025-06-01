import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // check Email Validation
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  // on email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.trim() === '') {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // on password change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleContinue = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail === '') {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError('Enter a valid email address');
      return;
    }

    setEmailError('');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setPassword('');
    setPasswordError('');
  };

  const handleLogin = async () => {
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const isProd = import.meta.env.PROD;

      const response = await axios.post(
        isProd ? 'https://api.rentpeylo.com/oauth/token' : '/api/oauth/token',
        {
          grant_type: 'password',
          username: email,
          password: password,
          role: 'customer',
          email: email,
        }
      );
      if (response.status === 200) {
        const token = response.data.access_token;
        const userName = response.data.first_name;
        localStorage.setItem('rentpeylo_token', token);
        localStorage.setItem('rentpeylo_user_name', userName);
        navigate('/home');
      }

    } catch (error) {
      const rawError = error.response?.data?.error;
      console.error('Login failed:', rawError ?? 'Invalid email or password');

      const apiErrorMessage =
        typeof rawError === 'string'
          ? rawError
          : rawError?.message || "Invalid Email or password";

      setPasswordError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-red-500 font-extrabold text-xl sm:text-2xl font-[cursive]">
        RentPeylo
      </div>

      <div className="w-full max-w-md sm:max-w-sm bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">Login</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${emailError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-orange-600'
                }`}
            />
            {emailError && <p className="text-red-600 text-sm mb-3">{emailError}</p>}

            <button
              onClick={handleContinue}
              className="w-full bg-orange-800 text-white py-2 rounded-md hover:bg-orange-900 transition mt-7"
            >
              Continue
            </button>

            <hr className="my-4" />

            <button className="w-full bg-gray-100 text-sm py-2 rounded-md hover:bg-gray-200 transition">
              Create your RentPeylo account
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
              Login with Password
            </h2>

            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-800">{email}</span>
              <button onClick={handleBack} className="text-orange-700 font-medium">
                Change user
              </button>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative mb-1">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 ${passwordError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-600'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-red-600 text-sm mb-3">{passwordError}</p>}

            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">Forgot password?</span>
              <button className="text-orange-700 font-medium">Reset Password</button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-orange-800 text-white py-2 rounded-md hover:bg-orange-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={!!passwordError || password === '' || loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>


            <hr className="my-4" />

            <button className="w-full bg-gray-100 text-sm py-2 rounded-md hover:bg-gray-200 transition">
              Log in with OTP on your email
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

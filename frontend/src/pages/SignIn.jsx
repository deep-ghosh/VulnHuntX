import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon from React Icons
import { SiMicrosoftoutlook, SiGithub } from "react-icons/si"; // Outlook and GitHub icons from React Icons

const SignIn = () => {
  // State to handle forgot password message visibility
  const [showForgotMessage, setShowForgotMessage] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading state
  const navigate = useNavigate();

  // Function to handle Forgot Password click
  const handleForgotPassword = () => {
    setShowForgotMessage(true);
    setTimeout(() => {
      setShowForgotMessage(false);
    }, 2000); // Show message for 1 second
  };

  // Function to handle Sign In click
  const handleSignIn = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setLoading(true);
    navigate("/");
    window.location.reload(); // Reload the page
  };

  // Spring animation for the login form
  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D121C] via-[#1c2b40] to-[#0D121C] flex justify-center items-center">
      <animated.div
        style={springProps}
        className="bg-[#111927] p-10 rounded-xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-white text-4xl font-bold text-center mb-6">
          Welcome Back!
        </h2>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <label
              className="block text-white text-sm font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-3 bg-[#1C2533] text-white border border-[#293445] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-3 bg-[#1C2533] text-white border border-[#293445] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-white">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-blue-500" />
              Remember Me
            </label>
            <button
              type="button"
              className="text-blue-400 hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          {/* Forgot password message */}
          {showForgotMessage && (
            <div className="text-center text-green-400 mt-4">
              Check your email to confirm the password reset.
            </div>
          )}

          <button
            // onClick={() => navigate("/")}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-md font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-white mt-6">Or sign in with:</div>

        <div className="flex justify-center mt-4 space-x-4">
          <button className="text-blue-400 flex items-center px-4 py-2 rounded-md shadow hover:shadow-lg transition-transform duration-300">
            <FcGoogle className="w-6 h-6 mr-2" />
          </button>

          {/* GitHub button in the middle */}
          <button className="text-blue-400 flex items-center px-4 py-2 rounded-md shadow hover:shadow-lg transition-transform duration-300">
            <SiGithub className="w-6 h-6 mr-2" />
          </button>

          <button className="text-blue-400 flex items-center px-4 py-2 rounded-md shadow hover:shadow-lg transition-transform duration-300">
            <SiMicrosoftoutlook className="w-6 h-6 mr-2" />
          </button>
        </div>

        <div className="text-center text-white mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </animated.div>
    </div>
  );
};

export default SignIn;

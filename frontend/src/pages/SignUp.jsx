import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon from React Icons
import { SiMicrosoftoutlook, SiGithub } from "react-icons/si"; // Outlook icon from React Icons

const SignUp = () => {
  const navigate = useNavigate();

  // Handle Sign Up button click
  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent form submission
    navigate("/signin"); // Navigate to Sign In page
    window.location.reload(); // Reload the page
  };
  // Spring animation for the signup form
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
          Create Your Account
        </h2>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label
              className="block text-white text-sm font-semibold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 p-3 bg-[#1C2533] text-white border border-[#293445] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-white">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-blue-500" />I agree
              to the terms and conditions
            </label>
          </div>

          <button
            // onClick={navigate("signin")}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-md font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-white mt-6">Or sign up with:</div>

        <div className="flex justify-center mt-4 space-x-4">
          <button className="text-blue-400 flex items-center px-4 py-2 rounded-md shadow hover:shadow-lg transition-transform duration-300">
            <FcGoogle className="w-6 h-6 mr-2" />
          </button>

          {/* Added GitHub button in the middle */}
          <button className="text-blue-400 flex items-center px-4 py-2 rounded-md shadow hover:shadow-lg transition-transform duration-300">
            <SiGithub className="w-6 h-6 mr-2" />
          </button>

          <button className="text-blue-400 flex items-center px-4 py-2 rounded-md shadow hover:shadow-lg transition-transform duration-300">
            <SiMicrosoftoutlook className="w-6 h-6 mr-2" />
          </button>
        </div>

        <div className="text-center text-white mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </div>
      </animated.div>
    </div>
  );
};

export default SignUp;

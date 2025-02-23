import React, { useState, useEffect } from "react";
import Pattern from "../components/Loader/Background";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Brainicon from "../icons/Brainicon";
import { useRef } from "react";
import { BACKEND_URL } from "../config";

const LoginandSignup = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernamesignup = useRef<HTMLInputElement>(null);
  const passwordsignup = useRef<HTMLInputElement>(null);
  
  const [isSignUp, setIsSignUp] = useState(false);
  const usernamelogin = useRef<HTMLInputElement>(null);
  const passwordlogin = useRef<HTMLInputElement>(null);
  // const [passwordlogin, setPasswordlogin] = useState("");
    // const [name, setName] = useState("");
  // const [usernamesignup, setUsernamesignup] = useState("");
  // const [passwordsignup, setPasswordsignup] = useState("");
  // const [usernamelogin, setUsernamelogin] = useState("");  
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const Login = async () => {
    
    const username=usernamelogin.current?.value;
    const password=passwordlogin.current?.value;

    try {
      const response = await axios.post(BACKEND_URL+ "/api/v1/signin", {
        username: username,
        password: password,
      });
      // console.log(response);
      // console.log(response.data.token);
      localStorage.setItem("authorization", response.data.token);
      alert("Login successful");
      navigate("/Sidebar");
    } catch (error) {
      console.log(error);
    }
  };
// e: React.FormEvent in below function can pass and use e.preventDefault() to prevent page reload and this is second method to get value from here and no need to use usestate bcz render happen optimazation happens
  const ConfirmSignup = async () => {
    // e.preventDefault(); //this line will prevent page reload
    const name=nameRef.current?.value;
    const username=usernamesignup.current?.value;
    const password=passwordsignup.current?.value;
    try {
      await axios.post(BACKEND_URL+"/api/v1/signup", {
        name: name,
        username: username,
        password: password,
      });
      alert("Signup successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Pattern />
      </div>

      {/* Card Container */}
      <div className="flex w-full  z-10 justify-around">
        <div className="flex flex-col items-start space-y-8">
          <div className="flex items-center space-x-6 transform hover:scale-110 transition-all duration-300 ease-in-out">
            <Brainicon width="150px" height="150px" />
            <h1 className="text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent shadow-lg">
              BRAIN SYNC
            </h1>
          </div>
          <p className=" pl-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 max-w-xl text-center md:text-left leading-tight mb-8 animate-pulse">
            A seamless space for your thoughts, connections, and endless
            possibilities. Never forget a link again.
          </p>
        </div>

        <div
          className={`relative z-10 w-96 p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl
        transition-all duration-1000 transform
        ${
          isAnimated
            ? "translate-y-0 animate-card-fall"
            : "-translate-y-[100vh]"
        }`}
          style={{
            animation: isAnimated
              ? "cardFall 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "none",
          }}
        >
          {/* Add these styles to your component */}
          <style>{`
          @keyframes cardFall {
            0% {
              transform: translateY(-100vh);
            }
            60% {
              transform: translateY(50px);
            }
            80% {
              transform: translateY(-25px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>

          {/* Toggle Button */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-3 rounded-l-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                !isSignUp
                  ? "bg-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-gray-100"
                  : "bg-white text-gray-700 hover:bg-gray-100 hover:text-purple-600 hover:shadow-md"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Log in
            </button>

            <button
              className={`px-6 py-3 rounded-r-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isSignUp
                  ? "bg-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-gray-100"
                  : "bg-white text-gray-700 hover:bg-gray-100 hover:text-purple-600 hover:shadow-md"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </div>

          {/* Flip Animation Container */}
          <div
            className={`relative w-full h-[400px] bg-white rounded-2xl shadow-2xl transition-transform duration-500 ${
              isSignUp ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Side (Login Form) */}
            <div
              className="absolute w-full h-full flex flex-col justify-center items-center p-8 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-600">
                Welcome Back
              </h2>
              <input
                type="text"
                placeholder="Username"
                // value={usernamelogin}
                ref={usernamelogin}
                // onChange={(e) => setUsernamelogin(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                // value={passwordlogin}
                ref={passwordlogin}
                // onChange={(e) => setPasswordlogin(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              {/* <button onClick={Login} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Let's go!
            </button> */}
              <button
                onClick={Login}
                className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 hover:rotate-2 hover:shadow-xl hover:shadow-purple-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Let's go!
              </button>
            </div>

            {/* Back Side (Signup Form) */}
            <div
              className="absolute w-full h-full flex flex-col justify-center items-center p-8 backface-hidden"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-600">
                Join Us
              </h2>
              <input
                type="text"
                placeholder="Name"
                // value={name}
                ref={nameRef}
                // onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input
                type="text"
                placeholder="username"

                // value={usernamesignup}
                ref={usernamesignup}
                // onChange={(e) => setUsernamesignup(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                ref={passwordsignup}
                // value={passwordsignup}
                // onChange={(e) => setPasswordsignup(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button
                onClick={ConfirmSignup}
                className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 hover:rotate-2 hover:shadow-xl hover:shadow-purple-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Confirm!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
};

export default LoginandSignup;

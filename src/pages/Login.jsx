import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { header } from "framer-motion/client";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleInputChange = (e) => {
    setFormData({ email: e.target.value });
  };

  // const handleSubmit = async (e) => {
  // e.preventDefault();

  // if (!formData.email) {
  //   toast.error("Please enter your email");
  //   return;
  // }

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(formData.email)) {
  //   toast.error("Please enter a valid email address");
  //   return;
  // }

  //   setIsLoading(true);

  //   try {
  //     const res = await axios.post(
  //       "https://keziah-api.onrender.com/api/auth/request-otp"
  //     );

  //     const data = await res.json();
  //     console.log(res);

  //     if (res.ok) {
  //       toast.success("OTP has been sent to your email");
  //       // Redirect to OTP page with email
  // navigate("/otp", { state: { email: formData.email } });
  //       console.log("OTP sent successfully:", data, {
  //         state: { email: formData.email },
  //       });
  //     } else {
  //       toast.error("Failed to send OTP");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Failed to send request. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    const data = { email };
    try {
      const response = await axios.post(
        "https://keziah-api.onrender.com/api/auth/request-otp",
        data,
        { header: { "Content-Type": "application/json" } }
      );
      // console.log(email);
      localStorage.setItem("email", email);
      toast.success("Login succesfull OTP has been sent to your email");
      navigate("/otp", { state: { email: formData.email } });
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-400 mb-2">
                Welcome Back
              </h1>
              <p className="text-yellow-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Enter your email and we'll send you a verification code
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-400 hover:to-yellow-400 disabled:opacity-50"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

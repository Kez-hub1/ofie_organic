import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle OTP verification
  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://keziah-api.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: otpCode }),
        }
      );

      const data = await res.json();
      console.log(data);
      localStorage.setItem("ACCESS_TOKEN", data.token);

      if (res.ok) {
        setIsVerified(true);
        setTimeout(() => {
          toast.success("Account verified successfully .");

          navigate("/"); // Redirect to homepage after success
        }, 2000);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    const email = localStorage.getItem("email");
    try {
      const res = await fetch(
        "https://keziah-api.onrender.com/api/auth/request-otp",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // If you have the user's email stored from login page:
          body: JSON.stringify({ email: localStorage.getItem("email") }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("A new OTP has been sent to your email.");
      } else {
        setError(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6FAEE] p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-500 mb-2">
          Verify Your OTP
        </h1>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {isVerified && (
          <p className="text-green-500 text-sm mb-4">
            ✅ Verified successfully!
          </p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-green-400 hover:to-yellow-400 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend OTP */}
        <p className="mt-4 text-sm text-gray-500">
          Didn't get the code?{" "}
          <button
            onClick={handleResend}
            className="text-green-500 hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}

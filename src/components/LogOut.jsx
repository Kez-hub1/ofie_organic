import React, { useState } from "react";
import { useNavigate } from "react-router"; 

const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const formData = new FormData();
      formData.append("name", "Shea Butter");
      formData.append("description", "A shinning glowing skin fro naturally made organics");
      formData.append("price", "20");
      formData.append("category", "Face Care");
      formData.append("stock", "100");
      formData.append("image", file);

      const response = await fetch("http://localhost:6061/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Logout failed");
      localStorage.removeItem("ACCESS_TOKEN");
      setShowModal(false);
      navigate("/home");
    } catch (error) {
      alert("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(-1);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/20">
      <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Logout</h1>
        <p className="mb-6 text-center">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
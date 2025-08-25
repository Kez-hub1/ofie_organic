import { Link } from "react-router";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-6">
      <Leaf className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-6xl font-bold text-green-700">404</h1>
      <p className="mt-4 text-xl text-gray-700">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

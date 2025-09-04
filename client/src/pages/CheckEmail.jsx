import React from "react";
import { Link } from "react-router-dom";

export default function CheckEmail() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We’ve sent you an email with a link to set your password.
          <br />
          Please check your inbox (and spam folder).
        </p>

        <Link
          to="/login"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

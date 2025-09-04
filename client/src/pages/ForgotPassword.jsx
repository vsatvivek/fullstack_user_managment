import React from "react";
import { useForm } from "react-hook-form";
import api from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      await api.post("/auth/forgot", data);
      setMessage("If that email exists, we’ve sent a reset link. Please also check your spam folder.");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 border rounded bg-white shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <Input
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
        />

        {/* Feedback messages */}
        {message && (
          <p className="text-green-600 text-sm mb-2 text-center">{message}</p>
        )}
        {errorMsg && (
          <p className="text-red-500 text-sm mb-2 text-center">{errorMsg}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        {/* ✅ Sign In link */}
        <p className="mt-4 text-sm text-center">
          Remembered your password?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

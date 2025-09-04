import React from "react";
import { useForm } from "react-hook-form";
import api from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [search] = useSearchParams();
  const nav = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const token = search.get("token");
  const email = search.get("email");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await api.post("/auth/reset", {
        email,
        token,
        password: data.password,
      });
      setSuccess(true);
      setTimeout(() => nav("/login"), 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Invalid token state
  if (errorMsg === "Invalid or expired token") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded shadow w-96 text-center">
          <h2 className="text-xl font-bold mb-2">Link Expired</h2>
          <p className="text-gray-600 mb-4">
            This reset link has already been used or has expired.
          </p>
          <Link to="/forgot" className="text-purple-600 hover:underline">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  if (!token || !email) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded shadow w-96 text-center">
          <h2 className="text-xl font-bold mb-2">Invalid Link</h2>
          <p className="text-gray-600 mb-4">This reset link is not valid.</p>
          <Link to="/forgot" className="text-purple-600 hover:underline">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 border rounded bg-white shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <Input
          label="New Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />

        {success && (
          <p className="text-green-600 text-sm mb-2">
            Password reset successful! Redirecting...
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}

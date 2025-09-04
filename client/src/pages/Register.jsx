// client/src/pages/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register as registerUser } from '../store/slices/authSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const nav = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);
    const res = await dispatch(registerUser(data));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      nav("/check-email"); // redirect to a page telling user to check inbox
    } else {
      setErrorMsg("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="auth-card w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full name"
            {...register("name", { required: "Full name is required" })}
            error={errors.name?.message}
          />

          <Input
            label="Email address"
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

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

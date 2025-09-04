import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);
    const res = await dispatch(login(data));
    setLoading(false);

    if (res.meta.requestStatus === 'fulfilled') {
      nav('/dashboard');
    } else {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-700 text-white p-10">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold">Gain Deeper Design Insights</h1>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="auth-card w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <Input
              label="Email address"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "SIGN IN"}
            </Button>

            <div className="flex justify-between items-center mt-4 text-sm">
              <Link to="/forgot" className="text-purple-600 hover:underline">
                Forgot password?
              </Link>
              <Link to="/register" className="text-purple-600 hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

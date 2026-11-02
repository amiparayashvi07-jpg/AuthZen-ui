import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout, { field, input } from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const result = await response.json();
            if (!response.ok || result.success === false) throw new Error(result.message || "Login failed");
      console.log("Success:", result);
            navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account"
      onSubmit={handleSubmit}
    >
      <div className={field}>
        <Mail size={18} className="text-slate-300" />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email id"
          required
          className={input}
        />
      </div>

      <div className={field}>
        <Lock size={18} className="text-slate-300" />
        <input
          type={showPass ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className={input}
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="text-slate-400 hover:text-white"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Link
        to="/reset-password"
        className="mb-6 inline-block text-sm text-indigo-400 transition hover:text-indigo-300"
      >
        Forgot password?
      </Link>

      {error && <p className="mb-4 text-center text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/50"
      >
        Login
      </button>

      <p className="mt-6 text-center text-xs text-slate-300">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-indigo-300 underline underline-offset-2 hover:text-white"
        >
          Sign up here
        </Link>
      </p>
    </AuthLayout>
  );
}
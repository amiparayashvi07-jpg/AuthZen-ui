import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout, { field, input } from "../components/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://authzen-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
                credentials: "include",
      body: JSON.stringify(form),
      });
      const result = await response.json();
            if (!response.ok || result.success === false) throw new Error(result.message || "Signup failed");
      console.log("Success:", result);
            navigate("/dashboard");
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account"
      onSubmit={handleSubmit}
    >
      <div className={field}>
        <User size={18} className="text-slate-300" />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className={input}
        />
      </div>

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

      {error && <p className="mb-4 text-center text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/50"
      >
        Sign Up
      </button>

      <p className="mt-6 text-center text-xs text-slate-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-300 underline underline-offset-2 hover:text-white"
        >
          Login here
        </Link>
      </p>
    </AuthLayout>
  );
}
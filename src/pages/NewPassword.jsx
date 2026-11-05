import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  X,
} from "lucide-react";

export default function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // OTP state
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showToast, setShowToast] = useState(true);
  const inputs = useRef([]);

  // Password state
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Hide the toast after 3 seconds and focus the first OTP box
  useEffect(() => {
    inputs.current[0]?.focus();
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e, i) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    if (!value) return;
    const next = [...otp];
    next[i] = value[value.length - 1];
    setOtp(next);
    if (i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      const next = [...otp];
      if (otp[i]) {
        next[i] = "";
        setOtp(next);
      } else if (i > 0) {
        next[i - 1] = "";
        setOtp(next);
        inputs.current[i - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    if (!pasted.length) return;
    const next = Array(6).fill("");
    pasted.forEach((d, idx) => (next[idx] = d));
    setOtp(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    try {
      const response = await fetch("https://authzen-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code, newPassword: password }),
      });
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Something went wrong");
      }
      setSuccess("Your new password has been successfully entered.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 pb-12 pt-28"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background glows (same as Home) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-slate-300/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-violet-300/40 blur-3xl" />

      {/* Soft grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#c7d2fe55_1px,transparent_1px),linear-gradient(to_bottom,#c7d2fe55_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* Toast */}
      {showToast && (
        <div className="absolute right-4 top-24 z-20 w-72 overflow-hidden rounded-xl bg-white shadow-xl shadow-indigo-200/60 ring-1 ring-slate-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <CheckCircle2 size={20} className="text-green-600" />
            <p className="flex-1 text-sm text-slate-700">OTP sent to your email</p>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-1 w-full bg-green-100">
            <div className="h-full w-full origin-left animate-[shrink_3s_linear_forwards] bg-green-600" />
          </div>
        </div>
      )}

      <div className="relative w-full max-w-[460px]">
        {/* Glow behind the card */}
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-indigo-400/40 via-violet-300/30 to-slate-300/40 blur-2xl" />

        {/* Gradient border */}
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-400/70 via-white/10 to-slate-400/50 p-px shadow-2xl shadow-indigo-300/50">
          <form
            onSubmit={handleSubmit}
            className="relative isolate rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-10 pb-10 pt-12"
          >
            {/* Inner decoration */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-violet-500/25 blur-3xl" />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(165,180,252,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
            </div>

            {/* Badge */}
            <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-400/50 ring-4 ring-white">
              <ShieldCheck size={26} className="text-white" />
            </div>

            <h2 className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-center text-3xl font-semibold text-transparent">
              New password
            </h2>
            <p className="mb-8 mt-3 text-center text-sm text-indigo-300">
              Enter the 6-digit code sent to your email and your new password
            </p>

            {/* OTP boxes */}
            <div className="mb-5 flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="h-14 w-12 rounded-xl bg-white/[0.06] text-center text-xl font-semibold text-white outline-none ring-1 ring-white/15 shadow-inner shadow-black/20 backdrop-blur transition focus:bg-white/10 focus:ring-2 focus:ring-indigo-400"
                />
              ))}
            </div>

            {/* Password */}
            <div className="mb-5 flex items-center gap-3 rounded-full bg-white/[0.06] px-5 py-3.5 ring-1 ring-white/15 shadow-inner shadow-black/20 backdrop-blur transition focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:shadow-indigo-500/20">
              <Lock size={18} className="text-slate-300" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                required
                minLength={6}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="text-slate-400 hover:text-white"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="mb-4 text-center text-sm text-red-400">{error}</p>}
            {success && <p className="mb-4 text-center text-sm text-green-400">{success}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/50"
            >
              Submit
            </button>

            <Link
              to="/login"
              className="mt-6 flex items-center justify-center gap-1 text-xs text-slate-300 transition hover:text-white"
            >
              <ArrowLeft size={14} /> Back to login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
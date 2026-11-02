import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "../assets/Logo.jpg";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap text-2xl font-bold"
        >
          <img src={logo} alt="AuthZen logo" className="h-10 w-10 object-contain" />
          <span>
            Auth<span className="text-indigo-600">Zen</span>
          </span>
        </Link>

        <Link
          to="/login"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-slate-800 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-300/60 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-400/60"
        >
          {/* Shine that sweeps across on hover */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Login</span>
          <ArrowRight
            size={16}
            className="relative transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </header>
  );
}
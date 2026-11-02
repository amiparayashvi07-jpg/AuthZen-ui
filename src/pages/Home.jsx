import { Link } from "react-router-dom";
import robot from "../assets/robot.jpg";

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 text-center">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-slate-300/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-violet-300/40 blur-3xl" />

      {/* Soft grid that fades toward the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#c7d2fe55_1px,transparent_1px),linear-gradient(to_bottom,#c7d2fe55_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative flex flex-col items-center">
        {/* Robot with glowing ring */}
        <div className="relative animate-[float_5s_ease-in-out_infinite]">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-400 via-violet-300 to-slate-300 opacity-60 blur-2xl" />
          <div className="relative rounded-full bg-gradient-to-tr from-indigo-500 via-violet-400 to-slate-300 p-1.5 shadow-xl shadow-indigo-200">
            <img
              src={robot}
              alt="AuthZen robot"
              className="h-36 w-36 rounded-full bg-white object-cover object-top md:h-40 md:w-40"
            />
          </div>
        </div>

        <p className="mt-10 text-xl font-medium text-slate-600 md:text-2xl">
          Hello!
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-slate-700 bg-clip-text text-transparent">
            AuthZen
          </span>
        </h1>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
          Simple to start. Safe to stay.
        </p>

      <Link
  to="/signup"
  className="mt-9 rounded-full bg-gradient-to-r from-indigo-600 to-slate-800 px-9 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-300/60 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300"
>
  Get Started
</Link>
      </div>
    </section>
  );
}

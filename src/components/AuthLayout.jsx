import { ShieldCheck } from "lucide-react";

export const field =
  "mb-4 flex items-center gap-3 rounded-full bg-white/[0.06] px-5 py-3.5 ring-1 ring-white/15 shadow-inner shadow-black/20 backdrop-blur transition focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:shadow-indigo-500/20";
export const input =
  "w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none";

export default function AuthLayout({ title, subtitle, onSubmit, children }) {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 pb-12 pt-28"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-slate-300/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-violet-300/40 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#c7d2fe55_1px,transparent_1px),linear-gradient(to_bottom,#c7d2fe55_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative w-full max-w-[440px]">
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-indigo-400/40 via-violet-300/30 to-slate-300/40 blur-2xl" />

        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-400/70 via-white/10 to-slate-400/50 p-px shadow-2xl shadow-indigo-300/50">
          <form
            onSubmit={onSubmit}
            className="relative isolate rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-10 pb-10 pt-12"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-violet-500/25 blur-3xl" />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(165,180,252,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
            </div>

            <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-400/50 ring-4 ring-white">
              <ShieldCheck size={26} className="text-white" />
            </div>

            <h2 className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-center text-3xl font-semibold text-transparent">
              {title}
            </h2>
            <p className="mb-8 mt-3 text-center text-sm text-indigo-300">
              {subtitle}
            </p>

            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
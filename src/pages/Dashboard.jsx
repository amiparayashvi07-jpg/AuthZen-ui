import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Mail,
  ShieldCheck,
  LayoutDashboard,
  IdCard,
  ListTodo,
  Plus,
  Trash2,
  Check,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // To-do list state (saved in the browser so it stays after refresh)
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos")) || [];
    } catch {
      return [];
    }
  });
  const [task, setTask] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch {
      /* ignore */
    }
  }, [todos]);

  // Load logged-in user. If not logged in, go to login page
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({}),
        });
        const result = await res.json();
        if (!result.success) {
          navigate("/login");
          return;
        }
        setUser(result.userData);
      } catch {
        navigate("/login");
      }
    };
    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  const addTodo = (e) => {
    e.preventDefault();
    const text = task.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setTask("");
  };

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  if (!user) return null;

  const doneCount = todos.filter((t) => t.done).length;
  const progress = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;

  const stats = [
    { title: "Name", value: user.name, icon: User },
    { title: "Email", value: user.email, icon: Mail },
    {
      title: "Account status",
      value: user.isAccountVerified ? "Verified" : "Not verified",
      icon: ShieldCheck,
    },
  ];

  const details = [
    { label: "Full name", value: user.name },
    { label: "Email id", value: user.email },
    { label: "Status", value: user.isAccountVerified ? "Verified" : "Not verified" },
  ];

  const card =
    "relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-2xl shadow-indigo-300/50";

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 pb-12 pt-28"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-slate-300/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-violet-300/40 blur-3xl" />

      {/* Soft grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#c7d2fe55_1px,transparent_1px),linear-gradient(to_bottom,#c7d2fe55_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-400/50">
              <LayoutDashboard size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Welcome back, {user.name}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className={`${card} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-indigo-400/60`}
            >
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/30 blur-3xl" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/40">
                <Icon size={22} className="text-white" />
              </div>
              <p className="relative mt-4 text-sm text-indigo-300">{title}</p>
              <p
                title={value}
                className="relative mt-1 truncate whitespace-nowrap text-xl font-semibold text-white"
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* My details + To-do */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          {/* My details */}
          <div className={`${card} p-7 lg:col-span-2`}>
            <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-violet-500/25 blur-3xl" />
            <div className="relative mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                <IdCard size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">My details</h2>
            </div>

            <div className="relative space-y-3">
              {details.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/[0.06] px-5 py-3.5 ring-1 ring-white/10"
                >
                  <p className="text-xs text-indigo-300">{label}</p>
                  <p title={value} className="mt-0.5 truncate text-sm font-medium text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* To-do list */}
          <div className={`${card} p-7 lg:col-span-3`}>
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="relative mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                  <ListTodo size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">To-do list</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-indigo-200">
                {doneCount}/{todos.length} done
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative mb-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Add task */}
            <form onSubmit={addTodo} className="relative mb-4 flex gap-3">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
                className="w-full rounded-full bg-white/[0.06] px-5 py-3 text-sm text-white placeholder-slate-400 outline-none ring-1 ring-white/15 transition focus:bg-white/10 focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-700 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition duration-300 hover:-translate-y-0.5"
              >
                <Plus size={16} /> Add
              </button>
            </form>

            {/* Tasks */}
            <ul className="relative max-h-64 space-y-2 overflow-y-auto pr-1">
              {todos.length === 0 && (
                <li className="rounded-2xl bg-white/[0.04] px-5 py-6 text-center text-sm text-indigo-300">
                  No tasks yet. Add your first task above.
                </li>
              )}
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(t.id)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 transition ${
                      t.done
                        ? "bg-gradient-to-br from-indigo-500 to-violet-500 ring-transparent"
                        : "ring-white/30 hover:ring-indigo-400"
                    }`}
                  >
                    {t.done && <Check size={14} className="text-white" />}
                  </button>
                  <span
                    className={`flex-1 break-words text-sm ${
                      t.done ? "text-slate-400 line-through" : "text-white"
                    }`}
                  >
                    {t.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteTodo(t.id)}
                    className="text-slate-400 transition hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
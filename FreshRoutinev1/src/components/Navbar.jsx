import { NavLink } from "react-router-dom";
import { useState } from "react";
import LightDarkToggle from "./LightDarkToggle";

const links = [
  { name: "Workspace", path: "/" },
  { name: "Focus Sounds", path: "/focus" },
  { name: "Analytics", path: "/analytics" },
  { name: "Sign in", path: "/login" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="mx-auto mt-2 grid min-h-12 w-[94%] md:w-[92%] max-w-4xl grid-cols-[1fr_auto] items-center rounded-xl bg-slate-900 px-2 md:px-4 py-1.5 text-white shadow-lg shadow-slate-900/10 transition-colors duration-200 dark:bg-slate-950/95 dark:shadow-indigo-950/20">
      <ul className="flex gap-1 md:gap-4 items-center justify-center flex-wrap">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `px-2.5 py-1 md:px-4 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-end gap-2 px-1">
        <LightDarkToggle theme={theme} onToggle={onToggleTheme} />

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((current) => !current)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-xs font-bold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-300/60"
            aria-label="Open account menu"
            aria-expanded={isProfileOpen}
          >
            FR
          </button>

          {isProfileOpen ? (
            <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Account
              </p>
              <p className="mt-2 truncate text-sm font-bold text-slate-900 dark:text-slate-50">
                Fresh Routine User
              </p>
              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                user@freshroutine.app
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

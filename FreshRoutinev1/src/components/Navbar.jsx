import { NavLink } from "react-router-dom";
import { useState } from "react";
import LightDarkToggle from "./LightDarkToggle";

const iconClass = "h-3.5 w-3.5 shrink-0";

function WorkspaceIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v5a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" />
      <path d="M20 13v5a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-5" />
      <path d="M12 16V8" />
      <path d="M16 16v-3" />
    </svg>
  );
}

function SignInIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

const links = [
  { name: "Workspace", path: "/", icon: WorkspaceIcon },
  { name: "Focus Sounds", path: "/focus", icon: HeadphonesIcon },
  { name: "Analytics", path: "/analytics", icon: ChartIcon },
  { name: "Sign in", path: "/login", icon: SignInIcon },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="mx-auto mt-2 grid min-h-12 w-[94%] md:w-[92%] max-w-4xl grid-cols-[1fr_auto] items-center rounded-xl bg-slate-900 px-2 md:px-4 py-1.5 text-white shadow-lg shadow-slate-900/10 transition-colors duration-500 dark:bg-slate-950/95 dark:shadow-indigo-950/20 dark:ring-1 dark:ring-indigo-400/15">
      <ul className="flex gap-1 md:gap-3 items-center justify-center flex-wrap">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                title={link.name}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon />
                <span className="sr-only sm:hidden">{link.name}</span>
                <span className="hidden whitespace-nowrap sm:inline">{link.name}</span>
              </NavLink>
            </li>
          );
        })}
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

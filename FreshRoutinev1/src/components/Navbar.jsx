import { NavLink } from "react-router-dom";
import LightDarkToggle from "./LightDarkToggle";

const links = [
  { name: "Workspace", path: "/" },
  { name: "Focus Sounds", path: "/focus" },
  { name: "Analytics", path: "/analytics" },
];

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="mx-auto mt-2 grid min-h-12 w-[94%] md:w-[92%] max-w-3xl grid-cols-[1fr_auto] items-center rounded-xl bg-slate-900 px-2 md:px-4 py-1.5 text-white shadow-lg shadow-slate-900/10 transition-colors duration-200 dark:bg-slate-950/95 dark:shadow-indigo-950/20">
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
      <div className="flex items-center justify-end px-1">
        <LightDarkToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
}

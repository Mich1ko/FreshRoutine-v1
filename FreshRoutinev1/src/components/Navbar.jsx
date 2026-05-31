import { NavLink } from "react-router-dom";

const links = [
  { name: "Workspace", path: "/" },
  { name: "Focus Sounds", path: "/focus" },
  { name: "Analytics", path: "/analytics" },
];

export default function Navbar() {
  return (
    <nav className="mx-auto mt-2 w-[92%] max-w-3xl h-12 bg-slate-900 text-white px-6 py-2 rounded-xl flex items-center justify-center shadow-lg">
      <ul className="flex gap-4 items-center justify-center">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

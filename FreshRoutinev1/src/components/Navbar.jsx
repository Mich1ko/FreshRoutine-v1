import { NavLink } from "react-router-dom";

const links = [
  { name: "Todo", path: "/todo" },
  { name: "Calendar", path: "/calendar" },
  { name: "Pomodoro", path: "/pomodoro" },
];

export default function Navbar() {
  return (
    <nav className="mx-auto mt-2 w-[92%] max-w-3xl h-12 bg-slate-900 text-white p-62 py-3 rounded-xl">
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-700"
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

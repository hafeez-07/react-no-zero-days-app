import darkLogo from "../assets/noZeroDaysLogoDark.png";
import lightLogo from "../assets/noZeroDaysLogo.png";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import {
  FaBars,
  FaStopwatch,
  FaHome,
  FaChartBar,
  FaClipboard,
  FaInfoCircle,
  FaBookOpen,
} from "react-icons/fa";
import { useState } from "react";

type HeaderProps = {
  streak: number;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

function Header({ streak, theme, toggleTheme }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="
        fixed top-0 left-0 w-full h-[9vh] z-50 font-semibold
        bg-slate-50 dark:bg-slate-950
        border-b border-slate-200 dark:border-slate-800
        shadow-sm dark:shadow-none
      ">
        <div className="flex items-center justify-between px-3 sm:px-6 h-full">
          <img
            src={theme === "dark" ? darkLogo : lightLogo}
            className="h-9 rounded-md"
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="
              flex items-center gap-6
              text-slate-700 dark:text-slate-200
            ">
              <NavLink className="hover:text-amber-500 transition" to="/">Home</NavLink>
              <NavLink className="hover:text-amber-500 transition" to="/dashboard">Dashboard</NavLink>
              <NavLink className="hover:text-amber-500 transition" to="/activity">Activity</NavLink>
              <NavLink className="hover:text-amber-500 transition" to="/about">About</NavLink>
              <NavLink className="hover:text-amber-500 transition" to="/guide">Guide</NavLink>
              <NavLink className="hover:text-amber-500 transition" to="/timer">
                <FaStopwatch />
              </NavLink>
            </nav>

            <div className="
              flex items-center gap-1 font-mono
              text-slate-800 dark:text-slate-100
            ">
              <span className="text-amber-400">🔥</span>
              <span>{streak}</span>
            </div>

            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-full
                text-slate-700 dark:text-slate-200
                hover:bg-slate-200 dark:hover:bg-slate-800
                transition
              "
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-amber-400">🔥</span>
              <span>{streak}</span>
            </div>
              <button
              onClick={toggleTheme}
              className="
                p-2 rounded-full
                text-slate-700 dark:text-slate-200
                hover:bg-slate-200 dark:hover:bg-slate-800
                transition
              "
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button
              className="
                p-2 rounded-md
                hover:bg-slate-200 dark:hover:bg-slate-800
              "
              onClick={() => setOpen(true)}
            >
              <FaBars size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* RIGHT DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-auto w-36 max-w-xs z-50
          bg-white dark:bg-slate-900
          border-l border-slate-200 dark:border-slate-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="
          p-5 flex flex-col items-end gap-4
          text-slate-700 dark:text-slate-200
        ">
          <button
            className="
              sm:hidden p-2 rounded-md
              hover:bg-slate-200 dark:hover:bg-slate-800
            "
            onClick={() => setOpen(false)}
          >
            <FaBars size={22} />
          </button>

          <NavLink to="/" onClick={() => setOpen(false)} className="menu-link">Home <FaHome /></NavLink>
          <NavLink to="/dashboard" onClick={() => setOpen(false)} className="menu-link">Dashboard <FaChartBar /></NavLink>
          <NavLink to="/activity" onClick={() => setOpen(false)} className="menu-link">Activity <FaClipboard /></NavLink>
          <NavLink to="/timer" onClick={() => setOpen(false)} className="menu-link">Timer <FaStopwatch /></NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="menu-link">About <FaInfoCircle /></NavLink>
          <NavLink to="/guide" onClick={() => setOpen(false)} className="menu-link">Guide <FaBookOpen /></NavLink>
        </div>
      </aside>
    </>
  );
}

export default Header;

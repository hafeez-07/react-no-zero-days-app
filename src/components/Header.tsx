import logo from "../assets/noZeroDaysLogoDark.png";
import { NavLink } from "react-router-dom";
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
};

function Header({ streak }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full h-[9vh] bg-slate-950 border-b border-slate-800 z-50 font-semibold">
        <div className="flex items-center justify-between px-2 sm:px-5 h-full">
          <img src={logo} className="h-9 rounded-lg" />

          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:gap-4 md:gap-6 items-center">
            <nav className=" flex items-center sm:gap-4 md:gap-6 text-slate-200">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/activity">Activity</NavLink>
              <NavLink to="/timer">
                <FaStopwatch />
              </NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/guide">Guide</NavLink>
            </nav>
            <div className="flex items-center gap-1 font-mono">
              <span className="text-amber-400">🔥</span>
              <span>{streak}</span>
            </div>
          </div>

          {/* Hamburger */}
          <div className="sm:hidden flex gap-4 items-center">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-amber-400">🔥</span>
              <span>{streak}</span>
            </div>
            <button className=" p-2" onClick={() => setOpen(true)}>
              <FaBars size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* DARK OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* RIGHT DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-auto w-34 max-w-xs
          bg-slate-900 z-50
          transform transition-transform duration-300
           ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className=" p-5 flex flex-col items-end gap-4 text-slate-200">
          <button className="sm:hidden p-2 " onClick={() => setOpen(!open)}>
            <FaBars size={22} />
          </button>
          <NavLink to="/" onClick={() => setOpen(false)} className="menu-link">
            Home <FaHome />
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="menu-link"
          >
            Dashboard <FaChartBar />
          </NavLink>
          <NavLink
            to="/activity"
            onClick={() => setOpen(false)}
            className="menu-link"
          >
            Activity <FaClipboard />
          </NavLink>
          <NavLink
            to="/timer"
            onClick={() => setOpen(false)}
            className="menu-link"
          >
            Timer <FaStopwatch />
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className="menu-link"
          >
            About <FaInfoCircle />
          </NavLink>
          <NavLink
            to="/guide"
            onClick={() => setOpen(false)}
            className="menu-link"
          >
            Guide <FaBookOpen />
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Header;

"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "home", path: "/", symbol: "()" },
  { name: "projects", path: "/projects", symbol: "[]" },
  { name: "about", path: "/about", symbol: "{}" },
  { name: "contact", path: "/contact", symbol: "<>" },
];
function NavItem({
  item,
  isActive,
  isClicked,
  onClick,
  isMobile,
  index,
  isOpen,
}) {
  const openDelay = index * 100;
  const closeDelay = (navItems.length - 1 - index) * 80;

  const style = isMobile
    ? {
        transform: isOpen ? "translateX(0)" : "translateX(-2rem)",
        opacity: isOpen ? 1 : 0,
        transition: `all 0.4s ease-in-out`,
        transitionDelay: isOpen ? `${openDelay}ms` : `${closeDelay}ms`,
      }
    : {};

  return (
    <li key={item.path} style={style}>
      <Link
        href={item.path}
        onClick={() => onClick(item.name)}
        className={`group relative font-mono ${
          isMobile
            ? "text-lg px-8 py-5"
            : "text-base md:text-lg px-6 py-4 md:px-8 md:py-5"
        } rounded-xl backdrop-blur-sm transition-all duration-300 ${
          isActive
            ? "text-neon-cyan glow-cyan bg-neon-cyan/10 border border-neon-cyan/30 shadow-lg shadow-neon-cyan/20"
            : "text-cool-gray hover:text-foreground hover:bg-steel-blue/5 border border-transparent hover:border-steel-blue/20"
        } ${isClicked ? "animate-click-pulse" : ""}`}
      >
        <div className="flex items-center space-x-2">
          {isActive && (
            <span className="text-electric-orange animate-slide-in-from-bottom font-semibold text-sm">
              current
            </span>
          )}
          <span className="text-electric-orange">.</span>
          <span
            className={`transition-all duration-500 ${
              isActive ? "text-neon-cyan font-semibold" : ""
            } ${isClicked ? "animate-bounce" : ""}`}
          >
            {item.name}
          </span>
          <span className="text-vivid-violet">
            {item.symbol.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 group-hover:rotate-3 group-hover:scale-105"
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        {/* Active underline */}
        {isActive && (
          <div className="absolute -bottom-1 left-3 right-3 h-1 bg-gradient-to-r from-neon-cyan via-electric-orange to-vivid-violet rounded-full animate-gradient-pulse"></div>
        )}

        {/* Hover underline */}
        <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-electric-orange to-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full"></div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-steel-blue/0 via-neon-cyan/5 to-vivid-violet/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </li>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Debounced scroll listener
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setScrolled(window.scrollY > 50), 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Body overflow lock on mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleItemClick = useCallback((itemName) => {
    setClickedItem(itemName);
    if (window.innerWidth < 768) setIsOpen(false);

    setTimeout(() => setClickedItem(null), 300);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`w-full fixed z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background bg-opacity-95 backdrop-blur-lg border-b border-steel-blue/30 shadow-xl shadow-neon-cyan/5"
          : "bg-transparent"
      }`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="nav-particle particle-1"></div>
        <div className="nav-particle particle-2"></div>
        <div className="nav-particle particle-3"></div>
        <div className="nav-particle particle-4"></div>
      </div>

      {/* Main Flexbox Container with proper spacing */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center py-2">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={() => handleItemClick("logo")}
              className="group flex items-center space-x-2 px-4 py-3 md:px-6 md:py-4 rounded-lg hover:bg-glass transition-all duration-300"
            >
              <span className="font-display text-2xl md:text-3xl font-bold">
                <span
                  className={`text-foreground ${
                    clickedItem === "logo"
                      ? "scale-95 text-neon-cyan"
                      : "group-hover:text-neon-cyan"
                  } transition-all duration-300`}
                >
                  samson
                </span>
                <span className="text-electric-orange animate-pulse">.</span>
                <span className="text-vivid-violet glow-violet">codes</span>
              </span>
            </Link>
          </div>

          {/* Right: Nested Flexbox for Navigation Items */}
          <div className="flex items-center">
            {/* Desktop Nav - Nested flexbox with proper spacing */}
            <div className="hidden md:flex items-center ">
              <ul className="flex justify-between items-center gap-8">
                {navItems.map((item) => (
                  <NavItem
                    key={item.path}
                    item={item}
                    isActive={pathname === item.path}
                    isClicked={clickedItem === item.name}
                    onClick={handleItemClick}
                    isMobile={false}
                  />
                ))}
              </ul>
            </div>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              className="md:hidden flex flex-col items-center justify-center w-14 h-14 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 border text-cool-gray hover:text-foreground hover:bg-steel-blue/5 border-transparent hover:border-steel-blue/20 ml-6"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        id="mobile-nav"
        className={`${
          isOpen
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        } md:hidden fixed top-0 left-0 w-full h-full bg-background/95 backdrop-blur-lg shadow-lg z-50 transition-all duration-500`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-cool-gray hover:text-foreground transition-colors duration-200 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center gap-8 mt-12 px-6">
          {navItems.map((item, index) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={pathname === item.path}
              isClicked={clickedItem === item.name}
              onClick={handleItemClick}
              isMobile={true}
              index={index}
              isOpen={isOpen}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

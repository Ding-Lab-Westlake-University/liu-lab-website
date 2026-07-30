"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/lab-life", label: "Lab Life" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar ${scrolled ? 'navbar-surface' : 'navbar-transparent'}`}>
      <nav className="navbar-inner">
        {/* Logo / Lab name */}
        <Link href="/" className="nav-logo">
          <img
            src="/liu-lab-website/images/logo.jpg"
            alt="Liu Lab logo"
            style={{ height: 52, width: "auto", display: "block", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex nav-links">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link nav-link-underline ${active ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link href="/contact#join" className="btn btn-primary hidden md:inline-flex">
            Join Us
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[6px] p-2 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-[var(--color-text)] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[var(--color-text)] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[var(--color-text)] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-bg)] border-b border-[var(--color-border)] px-6 pb-5 pt-2">
          <ul className="flex flex-col gap-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block text-[15px] text-[var(--color-text)] py-1 hover:text-[var(--color-dark)] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact#join" className="btn btn-primary w-full text-center">
                Join Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

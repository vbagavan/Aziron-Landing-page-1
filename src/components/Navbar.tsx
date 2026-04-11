"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Services",      dropdown: true  },
  { label: "Solutions",     dropdown: true  },
  { label: "Domains",       dropdown: false },
  { label: "Partners",      dropdown: true  },
  { label: "Perspectives",  dropdown: true  },
  { label: "About Us",      dropdown: false },
  { label: "Careers",       dropdown: false },
];

function AzironLogo() {
  return (
    <div className="flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.aziro.com/_next/image?url=https%3A%2F%2Fcdn.aziro.com%2Fmedia%2FAziro_Logo_1_34a430b0df.png&w=256&q=75"
        alt="Aziro"
        width={160}
        height={36}
        className="h-9 w-auto object-contain"
      />
    </div>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-aziron-border" : "bg-white/90 backdrop-blur"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <AzironLogo />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button className="flex items-center gap-1 text-aziron-text-soft hover:text-aziron-dark text-sm font-medium transition-colors duration-150">
                {link.label}
                {link.dropdown && <ChevronDown />}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center bg-aziron-orange hover:bg-aziron-orange-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-150"
        >
          Contact
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-aziron-dark p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-aziron-border px-6 py-4 space-y-1 shadow-lg">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              className="flex w-full items-center justify-between text-aziron-text-soft hover:text-aziron-dark text-sm font-medium py-2.5 border-b border-aziron-border last:border-0 transition-colors"
            >
              {link.label}
              {link.dropdown && <ChevronDown />}
            </button>
          ))}
          <a
            href="#contact"
            className="block w-full text-center bg-aziron-orange hover:bg-aziron-orange-dark text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors mt-4"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}

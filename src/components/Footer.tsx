"use client";

import { useState, useEffect } from "react";

const LINKS = {
  Services: [
    "Infrastructure Engineering",
    "Digital Engineering",
    "Artificial Intelligence",
    "Intelligent Networking and Virtualizations",
    "Hybrid and Multi-Cloud Engineering",
    "AI-Driven DevSecOps",
    "Cognitive Enterprise Automation",
    "Site Reliability Engineering",
    "QA Automation",
    "RAG-enabled Support Functions",
  ],
  Solutions: [
    "CAWi.ai-Chatbot",
    "AIOps",
    "RAG Application",
    "CodeLedger",
    "Aziron",
  ],
  CoEs: [
    "AI-Accelerated AppDev",
    "Autonomous QA",
    "Intelligent Storage & Systems",
    "AI-Optimized InfraOps",
    "AI-Driven Payments",
  ],
  "About Us": [
    "About Aziro",
    "Careers",
    "Press Releases",
    "Clients & Partners",
    "Awards & Recognition",
    "Brand Guidelines",
    "Contact Us",
  ],
};

const CERTIFICATIONS = [
  { alt: "ISO Logo" },
  { alt: "ISO 27001" },
  { alt: "Great Place to Work" },
  { alt: "Glassdoor Review" },
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

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    const lenis = (window as typeof window & { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-aziron-orange via-aziron-blue to-aziron-orange bg-[length:200%_200%] animate-gradient opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center shadow-lg"
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-br from-[#f9fbff] via-[#e6f0fb] via-[#f2f7ff] via-white via-[#fff8ed] via-[#fff3e5] to-[#fff8f2] text-gray-800 z-20">
      <ScrollToTop />

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-11">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category} className="flex flex-col border-b border-gray-200 last:border-none md:border-none max-md:pb-5">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-aziron-orange transition-colors duration-200 text-gray-800">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-300 mx-8 lg:mx-16" />

      {/* Brand + Contact */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-11 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 md:space-y-0 gap-5">
        <div className="flex flex-col items-start space-y-4 flex-1">
          <AzironLogo />
          <p className="text-sm text-gray-600 text-justify lg:max-w-2xl leading-relaxed">
            Aziro is an AI-native product engineering company driving innovation-led tech transformation for global enterprises, high-growth ISVs, and AI-first pioneers. We empower organizations to modernize platforms, automate intelligently, and harness AI-driven insights—accelerating innovation, unlocking new revenue streams, and ensuring they lead in an AI-first world.
          </p>
          <div className="w-full max-md:flex-wrap flex gap-5 md:space-x-5 lg:space-x-0 mt-4 justify-between md:justify-start">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="h-15 w-30 max-md:w-18 bg-white/50 rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-xs text-gray-400 font-semibold">{cert.alt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col lg:items-end space-y-4 lg:text-right">
          <div>
            <p className="text-gray-600 text-sm mb-1.5">Let&apos;s Talk (Toll Free)</p>
            <a href="tel:+18444150777" className="text-2xl text-gray-600 font-normal hover:text-aziron-orange transition-colors">
              +1 844 415 0777
            </a>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1.5">Email Us</p>
            <a href="mailto:info@aziro.com" className="text-2xl text-gray-600 font-normal hover:text-aziron-orange transition-colors">
              info@aziro.com
            </a>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-2">Connect with us</p>
            <div className="flex space-x-5">
              {[
                { name:"LinkedIn",  href:"https://www.linkedin.com/company/azirotech/", d:"M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" },
                { name:"Twitter",   href:"https://x.com/AziroTech",                    d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { name:"YouTube",   href:"https://www.youtube.com/@AziroTech",          d:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { name:"Facebook",  href:"https://www.facebook.com/AziroTech/",         d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { name:"Instagram", href:"https://www.instagram.com/azirotech",         d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              ].map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="hover:text-aziron-orange transition-colors duration-200" title={social.name}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="pt-8 text-center lg:text-left text-gray-600">
          © 2026 Aziro, All Rights Reserved.
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mt-4 space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex flex-wrap lg:justify-center space-x-4">
            {["Legal Privacy", "Terms of Use", "Cookie Policy"].map((label) => (
              <a key={label} href="#" className="text-gray-600 hover:text-aziron-orange transition-colors lg:whitespace-nowrap">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

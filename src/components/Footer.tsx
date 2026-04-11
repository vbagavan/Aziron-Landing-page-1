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
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                    <a
                      href="#"
                      className="hover:text-aziron-orange transition-colors duration-200 text-gray-800"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mx-8 lg:mx-16" />

      {/* Brand + Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-11 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 md:space-y-0 gap-5">
        {/* Left - Brand & Certifications */}
        <div className="flex flex-col items-start space-y-4 flex-1">
          <AzironLogo />
          
          <p className="text-sm text-gray-600 text-justify lg:max-w-2xl leading-relaxed">
            Aziro is an AI-native product engineering company driving innovation-led tech transformation for global enterprises, high-growth ISVs, and AI-first pioneers. We empower organizations to modernize platforms, automate intelligently, and harness AI-driven insights—accelerating innovation, unlocking new revenue streams, and ensuring they lead in an AI-first world.
          </p>

        </div>

        {/* Right - Contact Info */}
        <div className="w-full lg:w-auto flex flex-col lg:items-end space-y-4 lg:text-right">
          <div>
            <p className="text-gray-600 text-sm mb-1.5">Let&apos;s Talk (Toll Free)</p>
            <a
              href="tel:+18444150777"
              className="text-2xl text-gray-600 font-normal hover:text-aziron-orange transition-colors"
            >
              +1 844 415 0777
            </a>
          </div>

          <div>
            <p className="text-gray-600 text-sm mb-1.5">Email Us</p>
            <a
              href="mailto:info@aziro.com"
              className="text-2xl text-gray-600 font-normal hover:text-aziron-orange transition-colors"
            >
              info@aziro.com
            </a>
          </div>

          <div>
            <p className="text-gray-600 text-sm mb-2">Connect with us</p>
            <div className="flex space-x-5 text-2xl">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/company/azirotech/", icon: "M11.5974 8.86845C11.8888 8.53942 12.1276 8.20776 12.4269 7.92611C13.3456 7.05747 14.4324 6.62052 15.7003 6.63105C16.3985 6.63631 17.0863 6.68632 17.7609 6.88111C19.2991 7.32596 20.1916 8.38938 20.6195 9.89502C20.9398 11.0243 20.9975 12.1851 21.0001 13.3485C21.0054 15.8044 20.9923 18.2576 21.0001 20.7109C21.0001 20.9399 20.9371 21.0004 20.7114 20.9978C19.4514 20.9873 18.1888 20.9873 16.9288 20.9978C16.7056 20.9978 16.6584 20.9294 16.6584 20.7214C16.6663 18.3866 16.6663 16.0518 16.6584 13.7144C16.6584 13.13 16.619 12.5457 16.4563 11.9745C16.1544 10.9269 15.4063 10.3925 14.3116 10.4504C12.8154 10.5294 12.0384 11.2717 11.8468 12.7957C11.8021 13.159 11.7811 13.5249 11.7811 13.8908C11.7811 16.1624 11.7811 18.434 11.7864 20.7056C11.7864 20.932 11.7313 20.9978 11.5003 20.9978C10.2298 20.9873 8.95927 20.9873 7.68877 20.9978C7.48402 20.9978 7.42627 20.9452 7.42627 20.7372C7.43152 16.2413 7.43152 11.7429 7.42627 7.24699C7.42627 7.02325 7.49977 6.97324 7.70977 6.97324C8.91464 6.98113 10.1221 6.98376 11.327 6.97324C11.5501 6.97324 11.6053 7.04431 11.6026 7.25489C11.5895 7.79186 11.5974 8.32884 11.5974 8.86845ZM4.68837 14.0061C4.68837 16.2303 4.68575 18.4545 4.69362 20.6788C4.69362 20.9262 4.63325 20.9999 4.37862 20.9973C3.11862 20.9841 1.85862 20.9867 0.595996 20.9973C0.393871 20.9973 0.333496 20.9473 0.333496 20.7393C0.338746 16.2356 0.338746 11.7318 0.333496 7.2254C0.333496 7.03852 0.378121 6.97271 0.574996 6.97271C1.85337 6.98061 3.13175 6.98324 4.41012 6.97271C4.65687 6.97008 4.68837 7.06484 4.68837 7.27805C4.68312 9.52072 4.68575 11.7634 4.68575 14.0061M5.03477 2.51116C5.03477 3.90887 3.90602 5.046 2.51477 5.046C1.14452 5.04863 0.00526807 3.90887 1.80727e-05 2.53485C-0.00523193 1.14239 1.13402 0 2.52264 0C3.90077 0 5.03477 1.13449 5.03739 2.51116" },
                { name: "Twitter", href: "https://x.com/AziroTech", icon: "M0 0.080241C0.108661 0.0542169 0.215104 0.00433735 0.323765 0.00433735C2.00025 0 3.67673 0 5.35099 0C6.89664 2.19904 8.44228 4.39807 10.0057 6.62096C10.3006 6.28699 10.5556 6.00072 10.8106 5.71012C12.4783 3.80819 14.1437 1.9041 15.8113 0H17.3525C17.2859 0.0954217 17.2283 0.199518 17.1529 0.288434C15.9244 1.6894 14.6914 3.09036 13.4584 4.49132C12.5448 5.53012 11.6311 6.57108 10.7109 7.61638C10.7486 7.67494 10.7752 7.71831 10.804 7.76169C13.1391 11.0863 15.4742 14.413 17.8115 17.7354C17.8603 17.807 17.9379 17.859 18.0022 17.9219C17.8936 17.948 17.7871 17.9978 17.6785 17.9978C16.002 18.0022 14.3277 18.0022 12.6512 18.0022C11.0191 15.6795 9.38918 13.3569 7.74375 11.0169C7.63287 11.134 7.53751 11.2272 7.45103 11.3248C6.21141 12.7345 4.96957 14.1441 3.73217 15.5581C3.02476 16.3692 2.32623 17.1867 1.62326 18.0022H0.08205C0.133054 17.9133 0.170753 17.8157 0.23728 17.7398C1.27288 16.5578 2.31292 15.3802 3.35075 14.2005C4.57263 12.8125 5.79451 11.4224 7.02526 10.0193C6.96316 9.92169 6.90994 9.83277 6.85007 9.74602C4.65246 6.61879 2.45485 3.4894 0.257238 0.364337C0.184058 0.260241 0.0864852 0.173494 0 0.080241ZM2.16213 1.16892C2.2841 1.34241 2.35728 1.44867 2.43045 1.55494C5.92091 6.44313 9.42023 11.327 12.8907 16.2282C13.2433 16.727 13.5959 16.9742 14.2257 16.9005C14.7335 16.8419 15.2547 16.8875 15.829 16.8875C15.6937 16.6923 15.6139 16.5708 15.5274 16.4537C13.9042 14.1831 12.2809 11.9125 10.6599 9.64193C8.70395 6.90506 6.75249 4.16819 4.78773 1.43783C4.70124 1.31639 4.52606 1.1841 4.38857 1.17976C3.67451 1.15373 2.95824 1.16675 2.15991 1.16675" },
                { name: "YouTube", href: "https://www.youtube.com/@AziroTech", icon: "M23.7784 2.65524C23.4978 1.61095 22.6775 0.787937 21.6305 0.507302C19.7362 0 12.1429 0 12.1429 0C12.1429 0 4.54952 0 2.65524 0.507302C1.61095 0.787937 0.787937 1.60825 0.507302 2.65524C0 4.54952 0 8.5 0 8.5C0 8.5 0 12.4505 0.507302 14.3448C0.785238 15.389 1.60825 16.2121 2.65524 16.4927C4.54952 17 12.1429 17 12.1429 17C12.1429 17 19.7362 17 21.6305 16.4927C22.6748 16.2148 23.4978 15.3917 23.7784 14.3448C24.2857 12.4505 24.2857 8.5 24.2857 8.5C24.2857 8.5 24.2857 4.54952 23.7784 2.65524ZM9.71429 12.1429V4.85714L16.0232 8.5L9.71429 12.1429Z" },
                { name: "Facebook", href: "https://www.facebook.com/AziroTech/", icon: "M12.1489 13.9579L12.8221 9.46792H8.60738V6.55436C8.60738 5.32542 9.19501 4.12869 11.084 4.12869H13V0.303784C13 0.303784 11.2619 0 9.59803 0C6.12626 0 3.85677 2.1518 3.85677 6.04345V9.46562H0V13.9556H3.85902V24.8113C4.63353 24.9356 5.42605 25 6.23433 25C7.0426 25 7.83512 24.9356 8.60963 24.8113V13.9556H12.1512L12.1489 13.9579Z" },
                { name: "Instagram", href: "https://www.instagram.com/azirotech", icon: "M12.5 2.25294C15.8382 2.25294 16.2324 2.26471 17.55 2.32647C18.7676 2.38235 19.4294 2.58529 19.8706 2.75588C20.4529 2.98235 20.8706 3.25294 21.3088 3.69118C21.7471 4.12941 22.0176 4.54412 22.2441 5.12941C22.4147 5.57059 22.6176 6.23235 22.6735 7.45C22.7324 8.76765 22.7471 9.16471 22.7471 12.5C22.7471 15.8353 22.7353 16.2324 22.6735 17.55C22.6176 18.7676 22.4147 19.4294 22.2441 19.8706C22.0176 20.4529 21.7471 20.8706 21.3088 21.3088C20.8706 21.7471 20.4559 22.0176 19.8706 22.2441C19.4294 22.4147 18.7676 22.6206 17.55 22.6735C16.2324 22.7324 15.8382 22.7471 12.5 22.7471C9.16176 22.7471 8.76765 22.7353 7.45 22.6735C6.23235 22.6176 5.57059 22.4147 5.12941 22.2441C4.54706 22.0176 4.12941 21.7471 3.69118 21.3088C3.25294 20.8706 2.98235 20.4559 2.75588 19.8706C2.58529 19.4294 2.38235 18.7676 2.32647 17.55C2.26765 16.2324 2.25294 15.8353 2.25294 12.5C2.25294 9.16471 2.26471 8.76765 2.32647 7.45C2.38235 6.23235 2.58529 5.57059 2.75588 5.12941C2.98235 4.54706 3.25294 4.12941 3.69118 3.69118C4.12941 3.25294 4.54412 2.98235 5.12941 2.75588C5.57059 2.58529 6.23235 2.37941 7.45 2.32647C8.76765 2.26765 9.16471 2.25294 12.5 2.25294ZM12.5 0C9.10588 0 8.67941 0.0147059 7.34706 0.0764706C6.01765 0.138235 5.10882 0.35 4.31176 0.658824C3.48823 0.979412 2.79118 1.40588 2.09706 2.1C1.40294 2.79412 0.973529 3.49118 0.655882 4.31471C0.347059 5.10882 0.135294 6.01765 0.0764706 7.35C0.0147059 8.68235 0 9.10882 0 12.5029C0 15.8971 0.0147059 16.3235 0.0764706 17.6559C0.138235 18.9853 0.347059 19.8941 0.655882 20.6912C0.976471 21.5147 1.40294 22.2118 2.09706 22.9059C2.79118 23.6 3.48823 24.0294 4.31176 24.3471C5.10588 24.6559 6.01471 24.8676 7.34706 24.9294C8.67941 24.9912 9.10588 25.0059 12.5 25.0059C15.8941 25.0059 16.3206 24.9912 17.6529 24.9294C18.9824 24.8676 19.8912 24.6559 20.6882 24.3471C21.5088 24.0265 22.2059 23.6 22.9029 22.9059C23.5971 22.2118 24.0265 21.5147 24.3441 20.6912C24.6529 19.8971 24.8647 18.9882 24.9265 17.6559C24.9882 16.3235 25.0029 15.8971 25.0029 12.5029C25.0029 9.10882 24.9882 8.68235 24.9265 7.35C24.8647 6.02059 24.6529 5.11176 24.3441 4.31471C24.0235 3.49118 23.5971 2.79412 22.9029 2.1C22.2088 1.40588 21.5118 0.976471 20.6882 0.658824C19.8941 0.35 18.9853 0.138235 17.6529 0.0764706C16.3206 0.0147059 15.8941 0 12.5 0ZM12.4999 6.08203C8.9558 6.08203 6.08228 8.95556 6.08228 12.4997C6.08228 16.0438 8.9558 18.9203 12.4999 18.9203C16.044 18.9203 18.9176 16.0467 18.9176 12.4997C18.9176 8.95262 16.044 6.08203 12.4999 6.08203ZM12.4999 16.6673C10.1999 16.6673 8.33228 14.8026 8.33228 12.4997C8.33228 10.1967 10.197 8.33203 12.4999 8.33203C14.8029 8.33203 16.6676 10.1967 16.6676 12.4997C16.6676 14.8026 14.8029 16.6673 12.4999 16.6673ZM20.6736 5.82617C20.6736 6.65558 20.003 7.32617 19.1736 7.32617C18.3442 7.32617 17.6736 6.65558 17.6736 5.82617C17.6736 4.99676 18.3442 4.32617 19.1736 4.32617C20.003 4.32617 20.6736 4.99676 20.6736 5.82617Z" },
                { name: "Medium", href: "https://medium.com/@AziroTech", icon: "M34.571 14.2422C33.0263 14.2755 32.102 16.1254 31.9863 18.6927H35.9985V14.9943C35.9248 14.8873 35.8423 14.7875 35.7584 14.705C35.4446 14.4071 35.0483 14.2509 34.5695 14.2422H34.571ZM31.9199 19.4115C31.7636 22.2276 33.5137 24.5548 35.8091 24.7211C35.8757 24.7211 35.9335 24.7211 35.9986 24.7298V19.4043H31.9199V19.413V19.4115ZM34.464 27.7181C30.7974 27.7181 28.7262 24.6634 28.6423 20.8407C28.6423 20.6006 28.6423 20.3619 28.651 20.1305V19.9902C28.651 19.941 28.651 19.8904 28.6597 19.8412C28.7913 18.149 29.3366 16.6462 30.2362 15.5397C30.7974 14.8455 31.4671 14.3262 32.2264 13.9704C32.8947 13.632 33.8276 13.4497 34.5956 13.4497H34.6288C35.0989 13.4497 35.5618 13.4989 36 13.5987V5.91997C36 2.64974 33.3503 0 30.08 0H5.91997C2.64974 0 0 2.64974 0 5.91997V30.0786C0 33.3488 2.64974 35.9986 5.91997 35.9986H30.0786C33.3488 35.9986 35.9986 33.3488 35.9986 30.0786V27.5272C35.5285 27.6588 35.0078 27.734 34.4538 27.734L34.4625 27.7181H34.464ZM28.8159 27.329H21.8054V27.1222H21.83C22.7383 26.9082 23.2416 26.6102 23.3327 25.6527V11.4176L16.5782 27.2958H16.2065L9.64291 11.8472V25.2969C9.64291 26.5191 10.1549 26.8575 11.1544 27.0803H11.1789V27.2943H7.15806V27.0875H7.18264C8.18931 26.8561 8.70133 26.5176 8.70133 25.2955V11.0198C8.70133 9.79767 8.18931 9.45922 7.18988 9.23648H7.16529V9.02242H13.0939L18.2054 21.0359L23.3168 9.02242H28.8246V9.22925H28.8C27.7933 9.46067 27.2886 9.79912 27.2886 11.0213V25.6527C27.3797 26.6189 27.8989 26.9154 28.8072 27.1222H28.8318V27.3363L28.8159 27.3276V27.329Z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-aziron-orange transition-colors duration-200"
                  title={social.name}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="pt-8 text-center lg:text-left text-gray-600">
          © 2026 Aziro, All Rights Reserved.
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mt-4 space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex flex-wrap lg:justify-center space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-aziron-orange transition-colors lg:whitespace-nowrap"
            >
              Legal Privacy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-aziron-orange transition-colors lg:whitespace-nowrap"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-aziron-orange transition-colors lg:whitespace-nowrap"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

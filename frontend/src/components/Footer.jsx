import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-200 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Left: Website Name */}
        <div className="font-bold text-orange-950"> HIRE SPHERE</div>

        {/* Center: Copyright info */}
        <div className="text-gray-400 text-sm text-center flex-1">
          © 2025 HIRE SPHERE. All rights reserved.
        </div>

        {/* Right: Social media icons with hover effect */}
        <div className="flex gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full hover:bg-gray-700 transition"
          >
            <FaFacebookF className="text-sm" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full hover:bg-gray-700 transition"
          >
            <FaTwitter className="text-sm" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full hover:bg-gray-700 transition"
          >
            <FaLinkedinIn className="text-sm" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


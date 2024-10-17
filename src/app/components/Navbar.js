"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Roboto, Roboto_Condensed, Roboto_Flex, Roboto_Mono, Roboto_Serif, Roboto_Slab } from 'next/font/google';

const googleFont = Roboto({
    weight: ['300'], // Choose the font weights you need
    subsets: ['latin'], // Use latin subset
  });

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`bg-gray-800 p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">My Blog</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link href="/blog" className="text-white hover:text-gray-400">
            Blog
          </Link>
          <Link href="/about" className="text-white hover:text-gray-400">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link href="/" className="block px-4 py-2 text-white hover:bg-gray-700">
            Home
          </Link>
          <Link href="/blog" className="block px-4 py-2 text-white hover:bg-gray-700">
            Blog
          </Link>
          <Link href="/about" className="block px-4 py-2 text-white hover:bg-gray-700">
            About
          </Link>
          <Link href="/contact" className="block px-4 py-2 text-white hover:bg-gray-700">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

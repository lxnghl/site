"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/authAtoms'; // Adjust the import based on your structure
import { signOutAtom } from '../atoms/authAtoms'; // Import signOutAtom to handle logout
import Search from './Search'; // Import the SearchComponent
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAtom(userAtom); // Get the current user from the atom
  const [, signOut] = useAtom(signOutAtom); // Get the signOut function

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut(); // Call the signOut function
    setIsOpen(false);
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the mobile menu or the toggle button
      if (isOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsOpen(false); // Close the menu
      }
    };

    // Listen for clicks outside the menu
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Only re-run if `isOpen` changes

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Logo/>
        <div className="hidden md:flex items-center space-x-6">
          <Search />
          <Link href="/" className="text-white hover:text-gray-400"> Home </Link>
          <Link href="/blog" className="text-white hover:text-gray-400"> Blog </Link>
          <Link href="/todos" className="text-white hover:text-gray-400"> Todos </Link>
          <Link href="/about" className="text-white hover:text-gray-400"> About </Link>
          <Link href="/contact" className="text-white hover:text-gray-400"> Contact </Link>
          {(user != null && user.last_sign_in_at != null) && (
            <>
              <span className="text-white">Welcome, {user.email}!</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none menu-toggle" // Added unique class here
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
        <div className="md:hidden bg-gray-800 mobile-menu">
          <Search />
          <Link href="/" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsOpen(false)}> Home </Link>
          <Link href="/blog" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsOpen(false)}> Blog </Link>
          <Link href="/todos" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsOpen(false)}> Todos </Link>
          <Link href="/about" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsOpen(false)}> About </Link>
          <Link href="/contact" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsOpen(false)}> Contact </Link>
          {(user != null && user.last_sign_in_at != null) && (
            <>
              <span className="block px-4 py-2 text-white">
                Welcome, {user.email}!
              </span>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

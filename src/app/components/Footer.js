// Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 h-16 fixed bottom-0 w-full"> {/* Set height to 64px */}
      <div className="container mx-auto flex justify-between items-center h-full"> {/* Use h-full to fill footer height */}
        <div className="text-white text-sm leading-5"> {/* Smaller text with line height */}
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="/privacy" className="text-white hover:text-gray-400">Privacy</Link>
          <Link href="/terms" className="text-white hover:text-gray-400">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

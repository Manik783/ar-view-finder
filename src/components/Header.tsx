
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center glass-morphism px-6 py-4">
      <div className="text-gradient font-semibold text-xl">AR Viewfinder</div>
      <nav>
        <ul className="flex gap-8">
          <li className="relative opacity-80 hover:opacity-100 transition-opacity after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/50 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            <a href="#about">About</a>
          </li>
          <li className="relative opacity-80 hover:opacity-100 transition-opacity after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/50 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            <a href="#features">Features</a>
          </li>
          <li className="relative opacity-80 hover:opacity-100 transition-opacity after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/50 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

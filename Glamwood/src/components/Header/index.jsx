// src/components/Header.jsx
import React from 'react';
import { MdAccountCircle } from 'react-icons/md';

const Header = () => {
  return (
    <header className="bg-white p-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo shadow md */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">MyLogo</a>
        </div>
        <div className="flex items-center space-x-2">
          <MdAccountCircle className="w-10 h-10 text-gray-200" />
          <span className="hidden md:inline text-gray-800">Username</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

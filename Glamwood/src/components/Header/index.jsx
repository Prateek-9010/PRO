import React from 'react';
import { MdAccountCircle } from 'react-icons/md';

const Header = () => {
  return (
    <header className="bg-white p-2 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="flex justify-between items-center mx-4">
        <div className="text-xl font-bold text-gray-800">
          <a href="/">Glamwood</a>
        </div>
        <div className="flex items-center space-x-2">
          <MdAccountCircle className="w-8 h-8 text-gray-800" />
          <span className="hidden md:inline text-gray-800">Username</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

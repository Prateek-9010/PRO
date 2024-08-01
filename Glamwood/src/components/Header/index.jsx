import React, { useState, useEffect, useRef } from 'react';
import { MdAccountCircle } from 'react-icons/md';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white p-2 fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center mx-4">
          <div className="text-xl font-bold text-gray-800">
            <a href="/Homepage">Glamwood</a>
          </div>
          <button 
            id="dropdownUserAvatarButton" 
            onClick={toggleDropdown} 
            className="flex items-center space-x-2" 
            type="button"
          >
            <MdAccountCircle className="w-8 h-8 text-gray-800" />
            <span className="hidden md:inline text-gray-800">Username</span>
          </button>

          {dropdownOpen && (
            <div 
              id="dropdownAvatar" 
              ref={dropdownRef}
              className="absolute right-4 top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownUserAvatarButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                </li>
              </ul>
              <div className="py-2">
                <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          )}
        </div>
        <hr className="mt-2" />
      </header>
      <hr className="border-gray-200" /> 
    </>
  );
};

export default Header;

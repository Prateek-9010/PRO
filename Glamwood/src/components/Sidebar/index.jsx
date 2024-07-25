import React from 'react';
import { FaPlus, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-full pt-16 w-64 text-gray-800 overflow-y-auto flex">
      <div className="p-0.5 flex-grow">
        <ul className="mt-4 ml-5 mr-5">
          <li className="mt-2 hover:bg-gray-100 rounded">
            <button
              className="flex items-center p-1 rounded"
              onClick={() => {
                navigate('/Create');
              }}
            >
              <FaPlus className="mr-4 ml-5" />
              Create
            </button>
          </li>
          <li className="mt-2 hover:bg-gray-100 rounded">
            <button
              className="flex items-center p-1 rounded"
              onClick={() => {
                navigate('/Uploads');
              }}
            >
              <FaUpload className="mr-4 ml-5" />
              Your uploads
            </button>
          </li>
        </ul>
      </div>
      {/* Vertical line */}
      <div className="border-r border-gray-300 h-full mr-5"></div>
    </div>
  );
};

export default Sidebar;

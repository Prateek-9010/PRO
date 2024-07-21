import React from 'react';
import { FaPlus, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-full pt-16 w-64 bg-gray-800 text-white overflow-y-auto">
      <div className="p-0.5">
        <ul className="mt-4">
          <li className="mt-2 hover:bg-gray-700 rounded">
            <button
              className="flex items-center p-1 rounded"
              onClick={() => {
                navigate('/Create');
              }}
            >
              <FaPlus className="mr-2" />
              Create
            </button>
          </li>
          <li className="mt-2 hover:bg-gray-700 rounded">
            <button
              className="flex items-center p-1 rounded"
              onClick={() => {
                navigate('/Uploads');
              }}
            >
              <FaUpload className="mr-2" />
              Your uploads
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { FaPlus, FaUpload, FaCog } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white overflow-y-auto">
            <div className="p-4">
                <button onClick={() => { navigate("/") }}><h2 className="text-2xl font-bold">Glamwood</h2></button>
                <ul className="mt-4">
                    <li className="mt-2  hover:bg-gray-700 rounded">
                        <button
                            className="flex items-center p-2 rounded"
                            onClick={openModal}
                        >
                            <FaPlus className="mr-2" />
                            Create
                        </button>
                        <Modal isOpen={isModalOpen} onClose={closeModal} />
                    </li>
                    <li className="mt-2  hover:bg-gray-700 rounded">
                        <button
                            className="flex items-center p-2 rounded"
                            onClick={() => { navigate("/Uploads") }}
                        >
                            <FaUpload className="mr-2" />
                            Your uploads
                        </button>
                    </li>
                    <li className="mt-2">
                        <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <FaCog className="mr-2" />
                            Settings
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;


import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/Modal';
import UserContext from '../../context/UserContext';

const HomepagePage = ({ token }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/list', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setItems(response.data.items);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);//token

  return (
    <div>
      <Header/>
      <button
        className="ml-8 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={openModal}
      >
        <FaPlus className="mr-2" />
        Create
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {/* {items ? (
        items.map((item) => <h3 key={item}>{item}</h3>)
      ) : (
        <div>Protected</div>
      )} */}

    </div>
  );
};


export default HomepagePage;

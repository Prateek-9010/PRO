import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import UserContext from '../../context/UserContext';

const HomepagePage = ({ token }) => {
 
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


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <Header />
      </div>
    </div>
  );
};

export default HomepagePage;


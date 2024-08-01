import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card from '../../components/Card';
import axios from 'axios';

const Uploads = () => {
 
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-forms');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <Header />
        <div className="mt-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.map((data, index) => (
            <Card
              key={index}
              firstName={data.firstName}
              employeeStatus={data.employeeStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uploads;

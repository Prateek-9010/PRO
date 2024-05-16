import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = ({ token }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);//token

  return (
    <div>
      {items ? (
        items.map((item) => <h3 key={item}>{item}</h3>)
      ) : (
        <div>Protected</div>
      )}
    </div>
  );
};

export default Protected;



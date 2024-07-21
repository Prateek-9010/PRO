import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Uploads = () => {
  // const [files, setFiles] = useState([]);
  // const [imageUrls, setImageUrls] = useState({});

  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/files/');
  //       setFiles(response.data);
  //     } catch (error) {
  //       console.error('Error fetching files:', error);
  //     }
  //   };
  //   fetchFiles();
  // }, []);

  // const fetchImage = async (imageName, index) => {
  //   try {
  //     const response = await axios.get(`http://127.0.0.1:8000/files/${imageName}`, {
  //       responseType: 'blob',
  //     });
  //     const url = URL.createObjectURL(response.data);
  //     setImageUrls((prevImageUrls) => ({
  //       ...prevImageUrls,
  //       [index]: url,
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching image:', error);
  //   }
  // };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <Header />
        {/* <div className="mx-auto my-8 ml-10">
          <h2 className="text-2xl font-bold mb-4">Uploads List</h2>
          <ul className="list-disc pl-4">
            {files.map((file, index) => (
              <li key={index}>
                <h2>{file.name}</h2>
                <button onClick={() => fetchImage(file.imageName, index)}>
                  Image Name: {file.imageName}
                </button>
                {imageUrls[index] && (
                  <img
                    src={imageUrls[index]}
                    alt={file.name}
                    style={{ maxWidth: '300px', maxHeight: '300px' }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Uploads;

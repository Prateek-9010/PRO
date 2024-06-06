import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(newData);

    if (name === 'image' && files) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', formData.image);
    data.append('name', formData.name);

    if (!formData.name) {
      alert('Please enter name.');
      return;
    }

    if (!formData.image) {
      alert('Please upload image.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      console.log('Form data submitted:', result);
      alert(result.result);
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file');
    }
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-3xl font-bold text-black mb-4">New Expense</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border text-black border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-60 w-full object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

// uNteYDFXBKIOJZyrWn6O
// EBHGtuQsMg0dyxeUowNsbPe8X87GVwIgyMK2NvRJ


//NODE JS
// import React, { useState } from 'react';
// import { Client } from 'minio';

// const Modal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     image: null,
//   });

//   const minioClient = new Client({
//     endPoint: 'localhost',
//     port: 9000,
//     useSSL: false,
//     accessKey: 'minioadmin',
//     secretKey: 'minioadmin',
//   });

//   const bucketName = 'glamwood';

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.image) {
//       alert('Please select an image to upload');
//       return;
//     }

//     const fileName = `${formData.name}-${Date.now()}-${formData.image.name}`;

//     try {
//       minioClient.putObject(bucketName, fileName, formData.image, (err, etag) => {
//         if (err) {
//           console.error('Error uploading file:', err);
//           alert('Error uploading file');
//           return;
//         }

//         console.log('File uploaded successfully. ETag:', etag);
//         alert('File uploaded successfully');
//         onClose();
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error uploading file');
//     }
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-8 rounded shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">New Expense</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
//                 <input
//                   type="file"
//                   id="image"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   onClick={onClose}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;

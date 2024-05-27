import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', formData.image);
    data.append('name', formData.name);

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
    // if (!formData.name) 
    //   {
    //     alert('Please enter name.');
    //     return;
    //   }

    //  if (!formData.image) 
    //  {
    //    alert('Please upload image.');
    //    return;
    //  }
    //  try {
    //   const response = await axios.post('http://localhost:5000/submitEventData', formData);
    //   console.log(response.data);
    //   // Reset form after successful submission
    //   setFormData({ name: '', date: '', city:'' });
    //   onClose();
    //   alert('Your Event has been added!');
    //  } catch (error) {
    //    console.error('Error submitting form data:', error);
    // }
    // Handle form submission logic here, e.g., sending the data to a server
    // console.log('Form data submitted:', formData);
     onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">New Expense</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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

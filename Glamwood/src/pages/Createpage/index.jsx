import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Create = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.firstName) formErrors.firstName = "First name is required";
    if (!formData.lastName) formErrors.lastName = "Last name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) formErrors.phoneNumber = "Phone number is invalid";
    if (!formData.country) formErrors.country = "Country is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.pincode) formErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) formErrors.pincode = "Pincode is invalid";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted successfully', formData);
    }
  };

  return (
<>
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64">
      <Header />
    </div>
  </div>
  {/* Form Container */}
  <div className="mt-16 p-4 ml-64 mr-8 border bg-gray-100 rounded-lg overflow-hidden">
    <h2 className="text-xl font-bold mb-4">User Information*</h2>
    <form className="mb-4" onSubmit={handleSubmit}>
      {/* User Credentials Rows */}
      <div className="form-row grid grid-cols-2 gap-5">
        <div className="col-span-1 ml-5">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
        </div>
        <div className="col-span-1">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md "
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
        </div>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-6">Contact Details*</h2>
      {/* Contact Details Rows */}
      <div className="form-row grid grid-cols-2 gap-5">
        <div className="col-span-1 ml-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="col-span-1">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
        </div>
        <div className="col-span-1 ml-5">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.country && <p className="text-red-500 text-xs italic">{errors.country}</p>}
        </div>
        <div className="col-span-1">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
        </div>
        <div className="col-span-1 ml-5">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
        </div>
        <div className="col-span-1">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            onChange={handleChange}
            className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
          {errors.pincode && <p className="text-red-500 text-xs italic">{errors.pincode}</p>}
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary mr-8" type="submit">Submit</button>
      </div>
    </form>
  </div>
  
</>

  );
};

export default Create;

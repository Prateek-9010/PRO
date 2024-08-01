import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Create = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    pancard: '',
    employeeStatus: '',
  });

  const [errors, setErrors] = useState({});
  const [isActive, setIsActive] = useState(true);

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
    else if (/\d/.test(formData.firstName)) formErrors.firstName = "First name cannot contain numbers";
    if (!formData.lastName) formErrors.lastName = "Last name is required";
    else if (/\d/.test(formData.lastName)) formErrors.lastName = "Last name cannot contain numbers";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (!formData.mobileNumber) formErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber)) formErrors.mobileNumber = "Mobile number is invalid";
    if (!formData.country) formErrors.country = "Country is required";
    else if (/\d/.test(formData.country)) formErrors.country = "Country cannot contain numbers";
    if (!formData.state) formErrors.state = "State is required";
    else if (/\d/.test(formData.state)) formErrors.state = "State cannot contain numbers";
    if (!formData.city) formErrors.city = "City is required";
    else if (/\d/.test(formData.city)) formErrors.city = "City cannot contain numbers";
    if (!formData.pincode) formErrors.pincode = "Pincode is required";
    else if (!/^\d{6}(-\d{5})?$/.test(formData.pincode)) formErrors.pincode = "Pincode is invalid";
    if (!formData.addressLine1) formErrors.addressLine1 = "Address is required";
    else if (formData.addressLine1.length > 100) formErrors.addressLine1 = "Keep it in 100 characters";
    if (!formData.pancard) formErrors.pancard = "Pan-Card is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pancard)) formErrors.pancard = "Pan-Card is invalid";
    if (!formData.employeeStatus) formErrors.employeeStatus = "Employee status is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('http://localhost:8000/submit-form', formData);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          addressLine1: '',
          addressLine2: '',
          landmark: '',
          country: '',
          state: '',
          city: '',
          pincode: '',
          pancard: '',
          employeeStatus: '',
        });
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
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
      <div className="mt-16 p-4 ml-64 mr-8 border mb-5 bg-gray-100 rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Add User</h1>
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <form className="mb-4" onSubmit={handleSubmit}>
          {/* User Credentials Rows */}
          <div className="form-row grid grid-cols-2 gap-5">
            <div className="col-span-1 ml-5">
              <label htmlFor="firstName">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
            </div>
            <div className="col-span-1">
              <label htmlFor="lastName">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md "
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
            </div>
            <div className="col-span-1 ml-5">
              <label htmlFor="employeeStatus">
                Employee Status <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="radio"
                  id="employee"
                  name="employeeStatus"
                  value="Employee"
                  onChange={handleChange}
                  checked={formData.employeeStatus === "Employee"}
                  className="mr-2"
                  required
                />
                <label htmlFor="employee" className="mr-4">Employee</label>
                <input
                  type="radio"
                  id="nonEmployee"
                  name="employeeStatus"
                  value="Non-employee"
                  onChange={handleChange}
                  checked={formData.employeeStatus === "Non-employee"}
                  className="mr-2"
                  required
                />
                <label htmlFor="nonEmployee">Non-employee</label>
              </div>
              {errors.employeeStatus && <p className="text-red-500 text-xs italic">{errors.employeeStatus}</p>}
            </div>
            <div className="flex items-center ml-5">
            <input
              type="checkbox"
              id="toggleActive"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="form-checkbox"
            />
            <label htmlFor="toggleActive" className="ml-2">
              Active
            </label>
          </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-6">Contact Details</h2>
          {/* Contact Details Rows */}
          <div className="form-row grid grid-cols-2 gap-5">
            <div className="col-span-1 ml-5">
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="col-span-1">
              <label htmlFor="mobileNumber">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                onChange={handleChange}
                value={formData.mobileNumber}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.mobileNumber && <p className="text-red-500 text-xs italic">{errors.mobileNumber}</p>}
            </div>
            <div className="col-span-1 ml-5">
              <label htmlFor="addressLine1">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                onChange={handleChange}
                value={formData.addressLine1}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.addressLine1 && <p className="text-red-500 text-xs italic">{errors.addressLine1}</p>}
            </div>
            <div className="col-span-1">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                onChange={handleChange}
                value={formData.addressLine2}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-1 ml-5">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                onChange={handleChange}
                value={formData.landmark}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={handleChange}
                value={formData.country}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.country && <p className="text-red-500 text-xs italic">{errors.country}</p>}
            </div>
            <div className="col-span-1 ml-5">
              <label htmlFor="state">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                value={formData.state}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
            </div>
            <div className="col-span-1">
              <label htmlFor="city">
                City/Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                value={formData.city}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
            </div>
            <div className="col-span-1 ml-5">
              <label htmlFor="pincode">
                Pincode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 top-0 flex items-center pl-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  onChange={handleChange}
                  value={formData.pincode}
                  className="form-control w-3/4 mb-2 border border-gray-300 rounded-md ps-10 p-2.5"
                  placeholder="123456 or 678900"
                  required
                />
              </div>
              {errors.pincode && <p className="text-red-500 text-xs italic">{errors.pincode}</p>}
            </div>
            <div className="col-span-1">
              <label htmlFor="pancard">
                PAN CARD <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="pancard"
                name="pancard"
                onChange={handleChange}
                value={formData.pancard}
                className="form-control w-3/4 p-2 mb-2 border border-gray-300 rounded-md"
                required
              />
              {errors.pancard && <p className="text-red-500 text-xs italic">{errors.pancard}</p>}
            </div>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary mr-8"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
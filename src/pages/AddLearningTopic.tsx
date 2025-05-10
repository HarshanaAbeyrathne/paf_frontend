import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';
import Swal from 'sweetalert2';

const AddLearningTopic: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Plan ID

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resourceLink: '',
    targetDate: '',
    order: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Topic Title is required.';
    }

    if (formData.resourceLink && !/^https?:\/\/([a-z0-9\-\.]+|\d+\.\d+\.\d+\.\d+|localhost)(:[0-9]{1,5})?(\/.*)?$/i.test(formData.resourceLink)) {
      newErrors.resourceLink = 'Enter a valid URL.';
    }

    if (!formData.targetDate) {
      newErrors.targetDate = 'Target Completion Date is required.';
    } else if (new Date(formData.targetDate) < new Date()) {
      newErrors.targetDate = 'Target date must be in the future.';
    }

    if (!formData.order) {
      newErrors.order = 'Order is required.';
    } else if (isNaN(Number(formData.order)) || Number(formData.order) <= 0) {
      newErrors.order = 'Order must be a positive number.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Here you would send formData to your backend API
    console.log('Adding Topic:', formData);
    try {
      const response = await axiosInstance.post(`/learning-paths/${id}/contents`, formData);
      if(response){
        await Swal.fire({
                title: 'Success!',
                text: 'Learning plan created successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
      }
      // After successful add, navigate back to plan details
      navigate(`/learning-plan/${id}`);   

    }catch (error){
      console.error('Error adding topic:', error);
      await Swal.fire({
              title: 'Error!',
              text: 'Failed to create plan. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
    }
    // const response = await axiosInstance.post(`/learning-paths/${id}/topics`, formData);
    // if(!response) return;
    // After successful add, navigate back to plan details
    navigate(`/learning-plan/${id}`);
  };

  const handleCancel = () => {
    navigate(`/learning-plan/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-8 max-w-3xl mx-auto relative">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-800">Add New Topic</h1>
          <p className="text-gray-600 mt-1">Add a new topic or resource to your learning plan</p>
        </div>
        <button 
          onClick={handleCancel} 
          className="text-red-600 text-3xl font-bold hover:text-red-800 hover:rotate-90 transition-all duration-300"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl shadow-lg p-8 space-y-6 border border-indigo-100"
      >
        {/* Topic Title */}
        <div className="group">
          <label className="block font-semibold text-gray-700 mb-2 group-focus-within:text-indigo-700 transition-colors duration-200">
            Topic Title<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter topic title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="group">
          <label className="block font-semibold text-gray-700 mb-2 group-focus-within:text-indigo-700 transition-colors duration-200">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe what you'll learn in this topic"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
          ></textarea>
        </div>

        {/* Resource URL */}
        <div className="group">
          <label className="block font-semibold text-gray-700 mb-2 group-focus-within:text-indigo-700 transition-colors duration-200">
            Resource URL
          </label>
          <input
            type="text"
            name="resourceLink"
            value={formData.resourceLink}
            onChange={handleChange}
            placeholder="https://example.com/resource"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
          />
          {errors.resourceLink && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.resourceLink}
            </p>
          )}
        </div>

        {/* Two-Column Layout for Date and Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Completion Date */}
          <div className="group">
            <label className="block font-semibold text-gray-700 mb-2 group-focus-within:text-indigo-700 transition-colors duration-200">
              Target Completion Date<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
            />
            {errors.targetDate && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.targetDate}
              </p>
            )}
          </div>

          {/* Order */}
          <div className="group">
            <label className="block font-semibold text-gray-700 mb-2 group-focus-within:text-indigo-700 transition-colors duration-200">
              Order<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="1"
              placeholder="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
            />
            {errors.order && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.order}
              </p>
            )}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            Add Topic
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLearningTopic;
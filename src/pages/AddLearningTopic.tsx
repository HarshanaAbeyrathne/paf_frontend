import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

    if (formData.resourceLink && !/^https?:\/\/.+\..+/.test(formData.resourceLink)) {
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

    // After successful add, navigate back to plan details
    navigate(`/learning-plan/${id}`);
  };

  const handleCancel = () => {
    navigate(`/learning-plan/${id}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 max-w-3xl mx-auto relative">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Add New Topic</h1>
          <p className="text-gray-600">Add a new topic or resource to your learning plan</p>
        </div>
        <button onClick={handleCancel} className="text-red-600 text-3xl font-bold hover:text-red-800">
          &times;
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Topic Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Topic Title<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Resource URL */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Resource URL</label>
          <input
            type="text"
            name="resourceLink"
            value={formData.resourceLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.resourceLink && <p className="text-red-500 text-sm">{errors.resourceLink}</p>}
        </div>

        {/* Target Completion Date */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Target Completion Date<span className="text-red-500">*</span></label>
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.targetDate && <p className="text-red-500 text-sm">{errors.targetDate}</p>}
        </div>

        {/* Order */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Order<span className="text-red-500">*</span></label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="1"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.order && <p className="text-red-500 text-sm">{errors.order}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Topic
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLearningTopic;

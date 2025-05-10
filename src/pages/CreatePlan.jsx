// src/pages/CreatePlan.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // <-- import SweetAlert2

function CreatePlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');
  const [tag, setTag] = useState('');

  const handleCreatePlan = async () => {
    if (planName.trim() === '') {
      alert('Plan Name is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8084/api/learning-paths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: planName,
          tag: tag ? Number(tag) : null,
          contents: [],
        }),
      });

      if (response.ok) {
        // Success -> Show SweetAlert
        await Swal.fire({
          title: 'Success!',
          text: 'Learning plan created successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // After user clicks OK, navigate
        navigate('/my-learning-journey');
      } else {
        const errorData = await response.json();
        console.error('Failed to create plan:', errorData);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create plan. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleCancel = () => {
    navigate('/my-learning-journey');
  };

  const handleBack = () => {
    navigate('/my-learning-journey');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Plans
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Create New Learning Plan</h2>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Plan Name */}
        <div>
          <label className="block font-medium mb-1">
            Plan Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block font-medium mb-1">Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Tags can be used for categorization or priority.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePlan}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;

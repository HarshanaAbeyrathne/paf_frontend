import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LearningPlanDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the plan id from URL

  // Dummy plan details for now
  const plan = {
    name: 'Frontend Development',
    createdAt: '2024-05-01',
    progress: 30,
    topics: ['HTML Basics', 'CSS Fundamentals', 'JavaScript Introduction'],
  };

  const handleBack = () => {
    navigate('/my-learning-journey');
  };

  const handleEdit = () => {
    console.log('Edit Plan', id);
  };

  const handleDelete = () => {
    console.log('Delete Plan', id);
  };

  const handleAddTopic = () => {
    console.log('Add Topic to Plan', id);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 max-w-4xl mx-auto">
      {/* Top Navigation Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          &larr; Back to Plans
        </button>
        <div className="space-x-4">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Plan
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Plan
          </button>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">{plan.name}</h1>
        <p className="text-gray-600 mb-4">Created on: {plan.createdAt}</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${plan.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Learning Topics Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-800">Learning Topics</h2>
        <button
          onClick={handleAddTopic}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Topic
        </button>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <ul className="list-disc list-inside space-y-2">
          {plan.topics.map((topic, index) => (
            <li key={index} className="text-gray-700">
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningPlanDetails;

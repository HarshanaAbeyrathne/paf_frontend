import React from 'react';

interface LearningPlanProps {
  plan: {
    id: number;
    name: string;
    createdAt: string; // added created date
    progress: number;  // added progress bar
    topicsCount: number; // added number of topics
  };
}

const LearningPlanCard: React.FC<LearningPlanProps> = ({ plan }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <h2 className="text-blue-600 font-bold text-xl mb-2">{plan.name}</h2>
      <p className="text-gray-500 text-sm mb-2">Created on: {plan.createdAt}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${plan.progress}%` }}
        ></div>
      </div>
      <p className="text-gray-600 text-sm mb-2">Progress: {plan.progress}%</p>

      <p className="text-gray-600 text-sm mb-4">Topics: {plan.topicsCount}</p>

      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
};

export default LearningPlanCard;

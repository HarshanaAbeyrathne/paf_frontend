import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LearningPlanCard from '../components/LearningPlanCard';

interface LearningPath {
  id: number;
  name: string;
  createdAt: string;
  progress: number;
  topicsCount: number;
}

// Updated Dummy data
const dummyPlans: LearningPath[] = [
  { id: 1, name: 'Frontend Development', createdAt: '2024-05-01', progress: 30, topicsCount: 12 },
  { id: 2, name: 'Backend Development', createdAt: '2024-04-25', progress: 50, topicsCount: 15 },
  { id: 3, name: 'DevOps Basics', createdAt: '2024-03-15', progress: 20, topicsCount: 10 },
  { id: 4, name: 'AI Fundamentals', createdAt: '2024-02-20', progress: 70, topicsCount: 20 },
  { id: 5, name: 'Data Science', createdAt: '2024-01-10', progress: 90, topicsCount: 25 },
];

const MyLearningJourney: React.FC = () => {
  const [plans, setPlans] = useState<LearningPath[]>(dummyPlans); // Start with dummy data
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8084/api/learning-paths');
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        } else {
          console.error('Failed to fetch learning plans');
        }
      } catch (error) {
        console.error('Error fetching learning plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleCreateNewPlan = () => {
    navigate('/createplan');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">My Learning Journey</h1>
        <button
          onClick={handleCreateNewPlan}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Plan
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading plans...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <LearningPlanCard key={plan.id} plan={plan} />
            ))
          ) : (
            <p className="text-gray-600">No learning plans created yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLearningJourney;

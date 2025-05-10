import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LearningPlanCard from '../components/LearningPlanCard';
import Navbar from '../components/NavBar';
import axiosInstance from '../lib/axiosInstance';

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
        const response = await axiosInstance.get('/learning-paths');
        if (response.status === 200) {
          console.log(response);
          const data = await response?.data;
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 flex">
        {/* Left Sidebar (Navbar) */}
        <Navbar />
        
        {/* Main content area */}
        <div className="flex-1 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-blue-800">My Learning Journey</h1>
                  <p className="text-gray-600 mt-2">Track your progress across different learning paths</p>
                </div>
                <button
                  onClick={handleCreateNewPlan}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Plan
                </button>
              </div>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Cards grid */}
                {plans.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                      <div key={plan.id} className="flex justify-center">
                        <LearningPlanCard plan={plan} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-gray-600 mt-4 text-xl">No learning plans created yet.</p>
                    <button
                      onClick={handleCreateNewPlan}
                      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLearningJourney;
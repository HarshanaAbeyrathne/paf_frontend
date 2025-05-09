import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import the icons
import Swal from 'sweetalert2';

const LearningPlanDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the plan id from URL

  // Dummy plan details for now
  const [plan, setPlan] = useState({
    name: 'Frontend Development',
    createdAt: '2024-05-01',
    progress: 30, // Initial progress
    topics: [
      {
        title: 'HTML Basics',
        description: 'Learn the structure of web pages using HTML.',
        targetDate: '2024-05-10',
        resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        isChecked: false, // Track if the topic is completed
      },
      {
        title: 'CSS Fundamentals',
        description: 'Style web pages with CSS.',
        targetDate: '2024-05-15',
        resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        isChecked: false, // Track if the topic is completed
      },
      {
        title: 'JavaScript Introduction',
        description: 'Add interactivity with JavaScript basics.',
        targetDate: '2024-05-20',
        resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        isChecked: false, // Track if the topic is completed
      },
    ],
  });

  // Track the state for edit form visibility
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  // Update progress whenever the topics state changes
  useEffect(() => {
    const completedTopics = plan.topics.filter((topic) => topic.isChecked).length;
    const newProgress = (completedTopics / plan.topics.length) * 100;
    setPlan((prevPlan) => ({
      ...prevPlan,
      progress: newProgress,
    }));
  }, [plan.topics]);

  const handleBack = () => {
    navigate('/my-learning-journey');
  };

  const handleEdit = (index: number) => {
    setSelectedTopic(plan.topics[index]);
    setIsEditMode(true);
  };

  const handleDelete = (index: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this topic?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTopics = plan.topics.filter((_, i) => i !== index);
        setPlan((prevPlan) => ({
          ...prevPlan,
          topics: updatedTopics,
        }));
        Swal.fire('Deleted!', 'The topic has been deleted.', 'success');
      }
    });
  };
  

  const handleAddTopic = () => {
    navigate(`/learning-plan/${id}/add-topic`);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedTopics = [...plan.topics];
    updatedTopics[index].isChecked = !updatedTopics[index].isChecked;
    setPlan({ ...plan, topics: updatedTopics });
  };

  const handleSaveChanges = () => {
    // Update the topic in the plan's topics list
    const updatedTopics = plan.topics.map((topic) =>
      topic.title === selectedTopic.title ? selectedTopic : topic
    );
    setPlan((prevPlan) => ({
      ...prevPlan,
      topics: updatedTopics,
    }));
    setIsEditMode(false); // Hide the edit form
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setSelectedTopic({
      ...selectedTopic,
      [field]: e.target.value,
    });
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
            onClick={() => setIsEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Plan
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
      <div className="space-y-4">
        {plan.topics.length > 0 ? (
          plan.topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={topic.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-4"
                />
                <h3
                  className={`text-lg font-bold text-blue-700 mb-1 ${topic.isChecked ? 'line-through text-gray-500' : ''}`}
                >
                  {topic.title}
                </h3>
                {/* Edit and Delete Icons */}
                <div className="ml-auto flex space-x-2">
                  <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{topic.description}</p>
              <p className="text-gray-500 text-sm mb-1">Target Date: {topic.targetDate}</p>
              <a
                href={topic.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Resource
              </a>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No topics added yet.
          </div>
        )}
      </div>

      {/* Edit Topic Modal */}
      {isEditMode && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-semibold text-blue-800 mb-4">Edit Topic</h3>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-600">Title</label>
        <input
          type="text"
          value={selectedTopic?.title}
          onChange={(e) => handleChange(e, 'title')}
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-600">Description</label>
        <textarea
          value={selectedTopic?.description}
          onChange={(e) => handleChange(e, 'description')}
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Target Date */}
      <div className="mb-4">
        <label className="block text-gray-600">Target Date</label>
        <input
          type="date"
          value={selectedTopic?.targetDate}
          onChange={(e) => handleChange(e, 'targetDate')}
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Resource URL */}
      <div className="mb-4">
        <label className="block text-gray-600">Resource URL</label>
        <input
          type="text"
          value={selectedTopic?.resourceLink}
          onChange={(e) => handleChange(e, 'resourceUrl')}
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={() => setIsEditMode(false)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default LearningPlanDetails;

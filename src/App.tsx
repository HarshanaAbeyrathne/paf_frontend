import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Home from "../src/pages/Home"; // <-- Your Home component
import Login from "../src/pages/Login"; // <-- Your Login component
import AuthCallback from "./components/AuthCallback";
import Message from './pages/Message';

import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import MyLearningJourney from './pages/MyLearningJourney';
import CreatePlan from './pages/CreatePlan';
import LearningPlanDetails from './pages/LearningPlanDetails'; 
import AddLearningTopic from './pages/AddLearningTopic'; 

//------------------learning path------------------


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthCallback />} />
        {/* Add other routes as needed */}
        {/* Other routes */}
      {/* ⭐ New Route for Learning Journey */}
        <Route path="/my-learning-journey" element={<MyLearningJourney />} />
        <Route path="/createplan" element={<CreatePlan />} />
        <Route path="/learning-plan/:id" element={<LearningPlanDetails />} />
        <Route path="/learning-plan/:id/add-topic" element={<AddLearningTopic />} />




        {/* Add other routes as needed */}
        {/* Other routes */}
        <Route path="/message" element={<Message/>} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

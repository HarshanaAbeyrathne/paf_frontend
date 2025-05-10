import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import AuthCallback from "./components/AuthCallback";
import Chat from "./pages/Chat"; // Add import for Chat page

import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import SocialPost from "./components/LikeComment";
// import { NavbarDemo } from './components/NavBar';
import Message from './pages/Message';
import MyLearningJourney from './pages/MyLearningJourney';
import CreatePlan from './pages/CreatePlan';
import LearningPlanDetails from './pages/LearningPlanDetails'; 
import AddLearningTopic from './pages/AddLearningTopic';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthCallback />} />
        <Route path="/chat" element={<Chat />} /> {/* New chat route */}
       
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
        <Route path="/likeComment" element={<SocialPost />} />
      </Routes>
    </Router>
  );
}

export default App;
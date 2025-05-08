import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Home from "../src/pages/Home"; // <-- Your Home component
import Login from "../src/pages/Login"; // <-- Your Login component
import AuthCallback from "./components/AuthCallback";
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import MyLearningJourney from './pages/MyLearningJourney';
import CreatePlan from './pages/CreatePlan';
import LearningPlanDetails from './pages/LearningPlanDetails'; 

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
        

        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

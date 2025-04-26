import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Home from "../src/pages/Home"; // <-- Your Home component
import Login from "../src/pages/Login"; // <-- Your Login component
import AuthCallback from "./components/AuthCallback";

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
      </Routes>
    </Router>
  );
}

export default App;

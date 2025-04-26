import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home"; // <-- Your Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;

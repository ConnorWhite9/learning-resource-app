import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogOut from './pages/LogOut';
import Quiz from './pages/Quiz';

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] w-screen h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/quiz/:course/:level" element={<Quiz />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

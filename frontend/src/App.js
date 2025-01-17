import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./Components/TopBar/topBar";
import LoginPage from "./Components/LoginPageComponents/LoginPage/LoginPage";
import SignUp from "./Components/SignUpPageComponent/SignupPage/signup";
import HrPage from "./Components/hrPageComponents/hrPageComponents";
import ApplicationList from "./Components/ApplicationComponent/applicationComponent";
import CreateJob from "./Components/CreateJobComponent/createJob";
import FinalScoreDashboard from "./Components/DashBoard/FinalScoreDashboard";

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <TopBar />
        <div className="routes">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/jobs" element={<HrPage />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/:id" element={<ApplicationList />} />
            <Route path="/applications/:id" element={<FinalScoreDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

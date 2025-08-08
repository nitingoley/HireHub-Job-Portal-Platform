import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import RecuriterLogin from "./components/RecuriterLogin";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplication from "./pages/ViewApplication";
import 'quill/dist/quill.snow.css';

const App = () => { 
  const { showRecuriterLogin } = useContext(AppContext); 

  return (
    <div>
      {showRecuriterLogin && <RecuriterLogin />}
      
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} /> 

        {/* Nested routes for dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJobs />} />
          <Route path="view-application" element={<ViewApplication />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

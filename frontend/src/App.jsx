import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import RecuriterLogin from "./components/RecuriterLogin";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => { 
  const {showRecuriterLogin} = useContext(AppContext); 
 

  return (
   <div>
    {showRecuriterLogin  &&  <RecuriterLogin />}
    {/* <RecuriterLogin /> */}
      <Routes> 
      <Route path="/" element={<HomePage />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/apply-job/:id" element={<ApplyJob />} />
    </Routes>
   </div>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/apply-job/:id" element={<ApplyJob />} />
    </Routes>
  );
};

export default App;

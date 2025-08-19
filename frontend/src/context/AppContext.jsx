// AppContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecuriterLogin, setShowRecuriterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // fetch company data
  const fetchCompanyData = async (token) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token },
      });
      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // run only once at app start
  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
      fetchCompanyData(storedCompanyToken); 
    }
  }, []);

  // if companyToken changes, fetch company data
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData(companyToken);
    }
  }, [companyToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecuriterLogin,
    setShowRecuriterLogin,
    setCompanyToken,
    companyToken,
    setCompanyData,
    companyData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

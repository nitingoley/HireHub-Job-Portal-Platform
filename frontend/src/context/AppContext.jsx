// const { createContext } = require("react");
import { jobsData } from "../assets/assets";

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const [searchFilter , setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched , setIsSearched] = useState(false);
  const [jobs , setJobs] = useState([]);
  const [showRecuriterLogin , setShowRecuriterLogin] = useState(false);


  // function to fetch jobs data 
  const fetchJobs = async () =>{
    setJobs(jobsData)
  };
  

  useEffect(()=>{
    fetchJobs();
  },[]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecuriterLogin,
    setShowRecuriterLogin
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

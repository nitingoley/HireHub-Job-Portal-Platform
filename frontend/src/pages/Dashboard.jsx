import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken, companyToken } = useContext(AppContext);

  // logout function
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/"); // 👈 send back to home after logout
  };

  useEffect(() => {
    // ✅ navigate if token exists (not just companyData)
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    } else {
      navigate("/"); // no token = logged out
    }
  }, [companyData]);

  return (
    <div className="min-h-screen">
      {/* Navbar recruiter panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="max-sm:w-32 cursor-pointer"
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full"
                  src={companyData.image}
                  alt="Company"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-300 text-sm">
                    <li
                      className="py-2 px-2 cursor-pointer pr-10"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex items-start">
        {/* Sidebar */}
        <div className="inline-block min-h-screen border-r-2 border-gray-300">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="min-w-4" src={assets.add_icon} alt="Add" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img className="min-w-4" src={assets.home_icon} alt="Manage" />
              <p className="max-sm:hidden">Manage Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
              to="/dashboard/view-application"
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="View" />
              <p className="max-sm:hidden">View Application</p>
            </NavLink>
          </ul>
        </div>

        {/* Page Content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

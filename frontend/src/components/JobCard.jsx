import React from 'react';
import { assets } from '../assets/assets';

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-300 p-6 shadow rounded-md transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <img
          src={assets.company_icon}
          alt="Company Logo"
          className="h-8 w-auto object-contain"
        />
      </div>

      <h4 className="font-semibold text-lg text-gray-800">{job.title}</h4>

      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded">
          {job.level}
        </span>
      </div>

      <p
        className="text-gray-600 text-sm mt-4 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}
      />

      <div className="flex gap-3 mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
          Apply now
        </button>
        <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-100">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;

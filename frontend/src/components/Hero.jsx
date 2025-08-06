import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container  2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-10 rounded-lg flex flex-col items-center justify-center gap-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="text-center text-sm md:text-base lg:text-lg mb-6">
          Find the best job that suits your skills and interests. Explore a wide
          range of opportunities across various industries and locations.
          Whether you're looking for a full-time position, part-time work, or
          freelance gigs, we have something for everyone. Start your job search
          today and take the next step in your career!
        </p>
        <div className="flex items-center justify-between rounded text-gray-600  bg-white max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center ">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords"
              className="max-sm:text-xs p-2 rounded outline-none  w-full"
              ref={titleRef}
            />
          </div>

          <div className="flex items-center ">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              type="text"
              placeholder="location"
              className="max-sm:text-xs p-2 rounded outline-none  w-full"
              ref={locationRef}
            />
          </div>

          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white m-2"
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mt-5 mx-2 p-6 rounded-md flex">
        <div className="flex justify-center  gap-10 lg:gap-16 flex-wrap ">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="" />
          <img className="h-6" src={assets.walmart_logo} alt="" />
          <img className="h-6" src={assets.amazon_logo} alt="" />
          <img className="h-6" src={assets.adobe_logo} alt="" />
          <img className="h-6" src={assets.samsung_logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

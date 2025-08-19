import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const {backendUrl, companyToken} = useContext(AppContext);

  const editorRef = useRef(null);
  const quillRef = useRef(null);


const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const description = quillRef.current.root.innerHTML;

    const { data } = await axios.post(
      backendUrl + "/api/company/post-job",
      {
        title,
        description,
        location,
        salary,
        category,
        label: level   // send as label if backend expects it
      },
      { headers: { token: companyToken } }
    );

    if (data.success) {
      toast.success(data.message);
      setTitle("");
      setSalary(0);
      quillRef.current.root.innerHTML = "";
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(() => {
    // Initiate Quill only one time

    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input 
        className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      <div className="w-full max-w-lg">
        <p className="my-2">Job description</p>
        <div ref={editorRef}></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2"> Job Category </p>
          <select className="w-full px-3 py-2 border-2 border-gray-200  rounded" onChange={(e) => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2"> Job Location </p>
          <select className="w-full px-3 py-2 border-2 border-gray-200  rounded"  onChange={(e) => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option value={location} key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2"> Job Level </p>
          <select  className="w-full px-3 py-2 border-2 border-gray-200  rounded"  onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner level">Beginner level</option>{" "}
            <option value="Intermediate level">Intermediate level</option>{" "}
            <option value="Senior level">Senior level</option>
          </select>
        </div> 
</div>
        <div className="">
          <p className="mb-2">Salary</p>
          <input type="number" 
           placeholder='25000'
           onChange={e=>setSalary(e.target.value)}
           value={salary} 
           min={0}
           className="w-full px-3 py-2 border-2 border-gray-200 rounded sm:w-[120px]"
          />
        </div> 

        <button 
         className="bg-black w-28 mt-4 text-white py-4 rounded-lg"
        >Add</button>
      
    </form>
  );
};

export default AddJob;

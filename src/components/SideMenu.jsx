import React, { useEffect, useState } from "react";
import { TiTag } from "react-icons/ti";
import { PiNotepad } from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdCircle } from "react-icons/md";
import { PiTagSimpleBold, PiTagSimple, PiNotepadBold } from "react-icons/pi";
import { useNotes } from "../context/GlobalContext";

const SideMenu = () => {
  const { uniqueTags, notes } = useNotes();

  const [isOpen, setIsOpen] = useState(true); // Manage the side menu open state
  const [searchParams, setSearchParams] = useSearchParams(); // Manage query params
  const navigate = useNavigate();

  const tagValue = searchParams.get("tag") || null; // Get the current tag filter from the URL

  // Handle tag selection and update URL search params
  const handleTagClick = (tag) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set("tag", tag); // Set tag in URL if tag is clicked
    } else {
      params.delete("tag"); // Remove tag filter if "Notes" is clicked
    }
    navigate(`/?${params.toString()}`, { replace: true }); // Update URL without reloading
  };

  const tags = uniqueTags.map(tag => (
    <li
      key={tag} // safer key to avoid React warning
      className={`flex px-10 py-4 justify-between items-center 
          rounded-full  cursor-pointer overflow-hidden border border-black
          ${tagValue === tag ? "bg-[#000000] text-white" : "bg-transparent hover:bg-slate-200"} duration-200`}
      onClick={() => handleTagClick(tag)}
    >
      <p className={`font-medium whitespace-nowrap ${isOpen ? "block" : "hidden"}`}>
        {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </p>
    </li>
  ));


  return (
    <>
      <div
        className={`custom-scrollbar absolute top-[72px] left-2 right-2 bottom-0 py-2 overflow-y-scroll`}
      >
        <ul className="flex flex-wrap justify-center gap-1">

          {/* "All" button */}
          <li
            className={`px-10 py-4 flex items-center  rounded-full border border-black cursor-default ${!tagValue ? "bg-[#000000] text-white" : "hover:bg-slate-200"} 
             cursor-pointer overflow-hidden duration-300`}
            onClick={() => handleTagClick(null)} // Clears tag filter
          >
            <p className={` font-medium ${isOpen ? "block" : "hidden"}`}>
              All
            </p>
          </li>
          {/* Render tags */}
          {tags}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;

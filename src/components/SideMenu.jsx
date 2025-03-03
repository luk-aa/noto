import React, { useEffect, useState } from "react";
import { TiTag } from "react-icons/ti";
import { PiNotepad } from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdCircle } from "react-icons/md";
import { PiTagSimpleBold, PiTagSimple, PiNotepadBold } from "react-icons/pi";
import { useNotes } from "../context/GlobalContext";

const SideMenu = () => {
  const { uniqueTags } = useNotes();

  const [isOpen, setIsOpen] = useState(false); // Manage the side menu open state
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

  return (
    <>
      {isOpen &&
        <div
          className="absolute inset-0 z-50"
          onClick={() => setIsOpen(false)}
        >
        </div>
      }
      <div
        className={`custom-scrollbar px-3 py-2 pb-10 bg-white border fixed bottom-0 top-0 z-50 overflow-hidden
        ${isOpen ? "w-60 shadow-2xl overflow-y-auto" : "w-[72px]"} duration-300`}
        onMouseEnter={() => setIsOpen(true)} // Show side menu on mouse enter
        onMouseLeave={() => setIsOpen(false)} // Hide side menu on mouse leave
      >
        <ul className="flex flex-col justify-center items-start gap-2">
          <li className="flex my-2 justify-center w-full">
            <MdCircle className="text-3xl text-[#FF7900]" />
          </li>

          {/* "Notes" button */}
          <li
            className={`p-3 rounded-xl cursor-default ${!tagValue ? "bg-[#80CEE1] text-white" : "hover:bg-slate-200"} 
            ${isOpen ? "w-full" : "w-12"} cursor-pointer overflow-hidden duration-300`}
            onClick={() => handleTagClick(null)} // Clears tag filter
          >
            <div className="flex items-center gap-8">
              <div>
                <PiNotepad className="text-2xl" />
              </div>
              <p className={`text-sm font-medium ${isOpen ? "block" : "hidden"}`}>
                Notes
              </p>
            </div>
          </li>

          {/* Render tags */}
          {uniqueTags.map((tag) => (
            <li
              key={tag}
              className={`p-3 cursor-default rounded-xl ${tagValue === tag ? "bg-[#80CEE1] text-white" : "hover:bg-slate-200"} 
              ${isOpen ? "w-full" : "w-12"} cursor-pointer overflow-hidden duration-300`}
              onClick={() => handleTagClick(tag)} // Filters notes by tag
            >
              <div className="flex items-center gap-8">
                <div>
                  <PiTagSimple className="text-2xl" />
                </div>
                <p className={`text-sm font-medium whitespace-nowrap ${isOpen ? "block" : "hidden"}`}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)} {/* Capitalize tag */}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaEvernote } from "react-icons/fa";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { MdCircle } from "react-icons/md";
import { useNotes } from "../context/GlobalContext";


const Header = () => {
  const { gridView, setGridView } = useNotes()

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tagValue = searchParams.get("tag");


  // Initialize search value from URL
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  // Update URL only when searchValue changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      navigate(`/?${params.toString()}`, { replace: true }); // Avoids unnecessary history entries
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, navigate]);

  return (
    <header className=" w-full fixed z-50 top-0 right-0 left-0 h-16 pl-24 pr-5 py-2 bg-white flex items-center justify-betwee gap-5">
      {/* <MdCircle className="text-3xl text-yellow-500" /> */}
      <h2 className="sm:block hidden font-medium text-lg min-w-44 text-black">
        {tagValue
          ? (tagValue.length > 12
            ? tagValue.toUpperCase().slice(0, 12) + "..."
            : tagValue.toUpperCase()
          )
          : 'QUICK THOUGHTS'}
      </h2>
      <div className=" px-5 flex items-center gap-5 bg-[#f1f3f4] rounded-lg w-full h-full">
        <IoMdSearch className="text-2xl text-gray-500" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-[#f1f3f4] rounded-lg w-full h-full outline-none"
          placeholder="Search"
        />
      </div>
      <div
        className="hidden sm:block hover:bg-gray-200 p-3 rounded-full cursor-pointer"
        onClick={() => setGridView(!gridView)}
      >
        {gridView ? <CiGrid2H className="text-2xl text-black" /> : <CiGrid41 className="text-2xl text-black" />}
      </div>
    </header>
  );
};

export default Header;

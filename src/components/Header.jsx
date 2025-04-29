import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaEvernote } from "react-icons/fa";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { MdCircle } from "react-icons/md";
import { useNotes } from "../context/GlobalContext";
import rows from '../assets/Rows.svg'
import grid from '../assets/Grid.svg'
import Search from "./Search";
import { useHideOnScroll } from "../hooks/useHideOnScroll";


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

  const isHidden = useHideOnScroll(200); // you can adjust offset if needed

  return (
    <header
      className={`fixed left-0 right-0 z-40 pl-5  bg-white 
     flex items-center justify-betwee gap-2 
    ${isHidden ? '-top-20' : 'top-0'} ${window.scrollY > 5 ? 'mt-2 mx-4 h-14 text-2xl opacity-90 box-shadow-around rounded-full' : 'h-16 text-3xl'} duration-200`}>
      <h1 className="header-title font-semibold  text-black">
        {tagValue && tagValue !== 'all'
          ? (tagValue.length > 12
            ? tagValue.toUpperCase().slice(0, 12) + "..."
            : tagValue[0].toUpperCase() + tagValue.slice(1)
          )
          : 'Noto'}
      </h1>
      {/* <Search /> */}
      <div
        className=" absolute  right-5 sm:hover:bg-gray-200 sm:p-3 rounded-full cursor-pointer"
        onClick={() => setGridView(!gridView)}
      >
        {gridView
          ? <img src={rows} alt="rows-icon" className={`${window.scrollY > 5 ? 'w-6 h-6' : 'w-7 h-7'} duration-200`} />
          : <img src={grid} alt="grid-icon" className={`${window.scrollY > 5 ? 'w-6 h-6' : 'w-7 h-7'} duration-200`} />}
      </div>
    </header>
  );
};

export default Header;

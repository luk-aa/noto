import React, { useEffect, useState } from 'react'
import { IoIosClose, IoMdSearch } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotes } from '../context/GlobalContext';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll ';

const Search = ({ inputRef }) => {

  const { searchBarIsOpen, closeSearchBar } = useNotes()

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

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

  useLockBodyScroll(searchBarIsOpen);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 
          ${searchBarIsOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSearchBar}
      ></div>
      <div
        className={`h-14 m-2 fixed left-0 right-0 pl-5 pr-3 
        flex items-center gap-5 bg-white rounded-lg z-50 
        transition-all duration-200 
        ${searchBarIsOpen ? 'top-0' : '-top-20'}`}
      >
        <IoMdSearch className="text-3xl sm:text-2xl text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className=" rounded-lg w-full h-full outline-none"
          placeholder="Search"
        />
        <div onClick={() => setSearchValue('')}>
          <IoIosClose className='text-3xl text-gray-500' />

        </div>
      </div>
    </>
  )
}

export default Search
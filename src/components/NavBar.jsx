import React, { useEffect, useRef, useState } from 'react'
import { useNotes } from '../context/GlobalContext'
import { FaPlus } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { HiMenuAlt4 } from 'react-icons/hi';
import SideMenu from './SideMenu';
import Search from './Search';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll ';


const NavBar = () => {
  const { openTakeNote, closeTakeNote, openSearchBar, closeSearchBar } = useNotes()

  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef();

  function handleMenuClick() {
    setIsOpen(prev => !prev)
    closeSearchBar()
  }

  function handleSearchClick() {
    setIsOpen(false)
    openSearchBar()
    inputRef.current?.focus({ preventScroll: true });
  }
  useLockBodyScroll(isOpen);


  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 
          ${isOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={`flex fixed bottom-0 left-0 right-0 ${isOpen ? 'h-[400px]' : 'h-[72px]'} z-40 duration-200 ease-in-out `}>
        <div
          className={`box-shadow-around w-16 h-16 absolute z-50 rounded-full flex items-center 
      justify-center bg-white ${isOpen ? 'bottom-[368px]' : 'bottom-10'} right-1/2 translate-x-1/2 duration-200 ease-in-out`}
          onClick={(e) => {
            e.stopPropagation(); // Prevents `closeTakeNote` from being triggered
            openTakeNote();
          }}
        >
          <FaPlus className={`${isOpen ? 'rotate-90' : 'rotate-0'} duration-1000`} />
        </div>
        <div className="box-shadow-right rounded-tl-3xl w-1/2 h-full absolute bg-transparent"></div>
        <div className="box-shadow-left rounded-tr-3xl w-1/2 h-full absolute right-0 bg-transparent"></div>
        <div className={`inner-rounded-box-left w-1/2 h-full ${isOpen ? 'opacity-100' : 'opacity-90'} duration-500`}></div>
        <div className={`inner-rounded-box-right w-1/2 h-full ${isOpen ? 'opacity-100' : 'opacity-90'} duration-500`}></div>
        <div className='absolute right-8 top-5 text-3xl' onClick={handleSearchClick}>
          <IoSearch />
        </div>
        <div className='absolute left-8 top-5 text-3xl' onClick={handleMenuClick}>
          <HiMenuAlt4 />
        </div>
        <SideMenu />
      </div>
      <Search inputRef={inputRef} />
    </>
  )
}

export default NavBar
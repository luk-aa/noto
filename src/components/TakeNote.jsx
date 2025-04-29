import React, { useState, useRef, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../utils/data";
import NoteColor from "./NoteColor";
import { useNotes } from "../context/GlobalContext";
import { MdOutlineNewLabel } from "react-icons/md";
import { MdNewLabel } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { LuPalette } from "react-icons/lu";
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import { HiOutlineSave } from "react-icons/hi";
import { getFormattedDateParts } from "../utils/dateFormat";
import Form from "./Form";
import TagFormat from "./TagFormat";
import { IoMdArrowRoundDown } from "react-icons/io";
import { FiArrowDownCircle } from "react-icons/fi";
import { BsArrowDownCircle } from "react-icons/bs";


const TakeNote = () => {

  // Destructuring the necessary values from the context
  const {
    setNotes,
    options,
    takeNoteIsOpen,
    openTakeNote,
    closeTakeNote,
    selectedOption,
    setSelectedOption
  } = useNotes();

  // Local state to store the title and text of the note
  const [singleNote, setSingleNote] = useState({
    title: '',
    text: ''
  });

  // Local state to store the selected color for the note
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000')
  const [paletteIsOpen, setPaletteIsOpen] = useState(false)
  const [isTagInputVisible, setIsTagInputVisible] = useState(options > 0);

  const tagInputRef = useRef(null);

  useEffect(() => {
    if (isTagInputVisible && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }, [isTagInputVisible]);

  // Handles text change for title and text input
  const textChange = (e) => {
    const { name, value } = e.target;
    setSingleNote((prev) => ({ ...prev, [name]: value }));
  };



  function handleTagChange(newTags) {
    setSelectedOption(newTags || []);
    if (!newTags || newTags.length === 0) {
      setIsTagInputVisible(false);
    }
  }


  function handleBlur() {
    if (selectedOption.length === 0) {
      setIsTagInputVisible(false);
    }
  }

  // Handles the note save process
  const saveNote = (e) => {
    e.preventDefault();

    // Only save the note if title or text is not empty
    if (singleNote.title.trim() || singleNote.text.trim()) {
      const newNote = {
        ...singleNote,
        tags: selectedOption,
        id: Date.now(),
        isOpen: false,
        textColor: textColor,
        backgroundColor: backgroundColor,
        date: getFormattedDateParts()
      };
      // Update the notes in context with the new note
      setNotes((prev) => [...prev, newNote]);

      // Reset the form to its initial state after saving
      setSingleNote({ title: "", text: "" });
      setSelectedOption([]); // Reset selected tags
      closeTakeNote(false); // Close the note form
      setTextColor('#000000'); // Reset color to default
      setBackgroundColor('#FFFFFF')
    }
  };


  return (
    <div
      className={`px-2 py-10  h-full bottom-0 bg-black ${takeNoteIsOpen ? 'fixed   z-50  bg-opacity-60' : 'hidden'}
        inset-0 h-full flex items-center justify-center overflow-hidden`}
    >
      <div className="max-w-[600px]  w-full h-full relative rounded-3xl z-50 overflow-hidden">
        <form
          onSubmit={saveNote}
          className={`bg-slate-500  h-full flex flex-col justify-between p-3 rounded-3xl overflow-hidden`}
          style={{ backgroundColor: backgroundColor, color: textColor }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`shadow-lg absolute w-full left-0 py-5 px-3 rounded-b-3xl z-40 transition-all 
        duration-300 ease-in-out 
        ${isTagInputVisible ? 'top-0 opacity-100 pointer-events-auto' : '-top-20 opacity-0 pointer-events-none'}`}
            style={{ backgroundColor: "white" }}
          >
            <CreatableSelect
              isMulti
              name="tags"
              value={selectedOption}
              onChange={handleTagChange}
              onBlur={handleBlur}
              className={` custom-scrollbar`}
              styles={customStyles}
              placeholder="Tags..."
              options={options}
              ref={tagInputRef}
            />
          </div>
          <div>
            <FaCircle />
          </div>
          <Form
            titleValue={singleNote.title}
            textValue={singleNote.text}
            textColor={textColor}
            handleTextChange={textChange}
          />
          <div className=" pt-3 flex gap-2 flex-wrap">
            <TagFormat
              selectedOption={selectedOption}
              borderColor={textColor}
              isNote={true} />
          </div>
          {/* Menu Starts */}

          <div className=" p-2 flex justify-between items-center rounded-md">
            <div className=" flex items-center gap-8">
              <button
                type="submit"
                disabled={!(singleNote.title.trim() || singleNote.text.trim())} // Disable button if both title and text are empty
                className={` ${(singleNote?.title?.trim() || singleNote?.text?.trim()) ? 'opacity-100 cursor-pointer' : 'opacity-20'} `}
              >
                <FiArrowDownCircle className="text-[34px]" />
              </button>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setPaletteIsOpen(!paletteIsOpen)
                }}>
                <LuPalette className="text-3xl" />
              </div>
              <div
                className={` cursor-pointer`}
              >
                {!isTagInputVisible
                  ? <MdOutlineNewLabel
                    className="text-4xl"
                    onClick={() => setIsTagInputVisible(true)}
                  />
                  : <MdNewLabel
                    className={`text-4xl ${isTagInputVisible ? 'opacity-100' : 'opacity-0'} duration-200`}
                    onClick={() => setIsTagInputVisible(false)}
                  />
                }

              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={closeTakeNote}
            >
              <IoClose className='text-4xl bg-slat-200' />
            </div>
            {/* {!isTagInputVisible
              ? <MdOutlineNewLabel
                className="text-4xl sm:text-2xl"
                onClick={() => setIsTagInputVisible(true)}
              />
              : <MdNewLabel
                className={`text-4xl sm:text-2xl ${isTagInputVisible ? 'opacity-100' : 'opacity-0'} duration-200`}
                onClick={() => setIsTagInputVisible(false)}
              />
            } */}
            {/* <div className="hidden sm:block">
              <NoteColor
                textColor={textColor}
                setTextColor={setTextColor}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                circleSize={'32px'} />
            </div> */}

          </div>
        </form>
      </div>

      <div
        className={`absolute inset-0 bg-black z-50 transition-opacity duration-500 
            ${paletteIsOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => {
          e.stopPropagation()
          setPaletteIsOpen(false)
        }}
      >
      </div>

      <div
        className={` box-shadow absolute bottom-0 left-0 z-50 flex justify-between items-center px-2 sm:px-5 py-4 w-full  rounded-t-3xl bg-white
          ${paletteIsOpen ? 'translate-y-0' : 'translate-y-full'} duration-200`}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: backgroundColor }}
      >
        <NoteColor
          textColor={textColor}
          setTextColor={setTextColor}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          circleSize={'48px'}
        />
        <p className="hidden sm:block" style={{ color: textColor }}>"There's a reason we don't see the world in black and white." - Celerie Kemble</p>
      </div>
    </div >
  );
};

export default TakeNote;

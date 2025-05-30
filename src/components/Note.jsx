import React, { useEffect, useState, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../utils/data";
import { useNotes } from "../context/GlobalContext";
import NoteColor from "./NoteColor";
import { MdDeleteOutline, MdNewLabel, MdOutlineNewLabel } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPalette } from "react-icons/lu";
import { FaCircle } from "react-icons/fa6";
import TagFormat from "./TagFormat";
import Form from './Form';

const Note = ({ singleNote, title, text, tags, id, textColor, backgroundColor }) => {
  const { setNotes, closeNote, deleteNote, options, changeNoteColor } = useNotes();

  const [isTagInputVisible, setIsTagInputVisible] = useState(false);
  const [note, setNote] = useState({ title, text });
  const [selectedOption, setSelectedOption] = useState(tags);
  const tagInputRef = useRef(null);

  const [paletteIsOpen, setPaletteIsOpen] = useState(false)

  useEffect(() => {
    if (isTagInputVisible && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }, [isTagInputVisible]);

  function handleTextChange(e) {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

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

  function handleSubmit(e) {
    e.preventDefault();
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === id
          ? { ...prevNote, title: note.title, text: note.text, tags: selectedOption }
          : prevNote
      )
    );
    closeNote(id);
  }


  return (
    <div
      className="fixed px-2 py-10 inset-0 flex items-center justify-center 
      bg-[#202124] bg-opacity-60 overflow-hidden z-50"
      onClick={handleSubmit}
    >
      <div
        className=" max-w-[600px] w-full h-full rounded-3xl relative z-50 overflow-hidden "
        onClick={(e) => e.stopPropagation()}
      >

        {/* CREATE TAGS USING REACT-SELECT */}

        <div className={`shadow-lg absolute w-full left-0 py-5 px-3 rounded-b-3xl z-40 transition-all duration-300 ease-in-out 
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

        {/* STARTING FORM */}

        <form
          className="relative h-full flex flex-col justify-between p-3 rounded-3xl"
          style={{ backgroundColor: backgroundColor, color: textColor }}
          onSubmit={handleSubmit}
          onClick={() => {
            setPaletteIsOpen(false)
            setIsTagInputVisible(false)
          }}
        >
          <div>
            <FaCircle />
          </div>

          <Form
            day={singleNote.date?.day}
            month={singleNote.date?.month}
            year={singleNote.date?.year}
            titleValue={note.title}
            textValue={note.text}
            handleTextChange={handleTextChange}
          />
          <div className=" pt-3 flex gap-2 flex-wrap">
            <TagFormat
              note={singleNote}
              selectedOption={selectedOption}
              borderColor={textColor}
              isNote={true} />
          </div>
          <div className="p-2 flex justify-between items-center rounded-md">
            <div className=" flex items-center gap-8">
              <button>
                <IoArrowBackOutline className='text-3xl' />
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
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsTagInputVisible(true)
                    }} />
                  : <MdNewLabel
                    className={`text-4xl ${isTagInputVisible ? 'opacity-100' : 'opacity-0'} duration-200`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsTagInputVisible(false)
                    }} />
                }

              </div>
            </div>
            <div className="flex gap-2 sm:opacity-70">
              <div
                onClick={() => deleteNote(id)}
                className=" hover:bg-gray-200 hover:bg-opacity-60 rounded-full cursor-pointer"
              >
                <MdDeleteOutline className="text-3xl" />
              </div>
            </div>

            {/* PALETTE PC */}

            {/* <div
              className="hidden  duration-200"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: note.backgroundColor }}
            >
              <NoteColor backgroundColor={backgroundColor} handleNoteColor={(textColor, backgroundColor) => changeNoteColor(id, textColor, backgroundColor)} />
            </div> */}

          </div>
        </form>
      </div>

      {/* PALETTE MOBILE */}

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
        <NoteColor backgroundColor={backgroundColor} handleNoteColor={(textColor, backgroundColor) => changeNoteColor(id, textColor, backgroundColor)} circleSize={'48px'} />
        <p className="hidden sm:block" style={{ color: textColor }}>"There's a reason we don't see the world in black and white." - Celerie Kemble</p>
      </div>
    </div >
  );
};

export default Note;

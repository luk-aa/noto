import React, { useEffect, useState, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { RiDeleteBinLine } from "react-icons/ri";
import { customStyles } from "../utils/data";
import { useNotes } from "../context/GlobalContext";
import NoteColor from "./NoteColor";
import { MdNewLabel, MdOutlineNewLabel } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPalette } from "react-icons/lu";

const Note = ({ title, text, tags, id, color }) => {
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
      className="fixed px-2 inset-0 flex items-center justify-center bg-[#202124] bg-opacity-60 overflow-hidden z-50"
      onClick={handleSubmit}
    >
      <div
        className="max-w-[600px] w-full max-h-[500px] h-full relative z-50 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="relative h-full flex flex-col p-4 rounded-lg"
          style={{ backgroundColor: color }}
          onSubmit={handleSubmit}
          onClick={() => setPaletteIsOpen(false)}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleTextChange}
              className="py-3 px-2 text-xl placeholder:text-black w-full bg-transparent rounded-lg outline-none"
              placeholder="Title"
            />
            <div
              className={` cursor-pointer`}
            >
              {!isTagInputVisible
                ? <MdOutlineNewLabel className="text-3xl" onClick={() => setIsTagInputVisible(true)} />
                : <MdNewLabel className={`text-3xl ${isTagInputVisible ? 'opacity-100' : 'opacity-0'} duration-200`} onClick={() => setIsTagInputVisible(false)} />}

            </div>
          </div>

          {isTagInputVisible && (
            <CreatableSelect
              isMulti
              name="tags"
              value={selectedOption}
              onChange={handleTagChange}
              onBlur={handleBlur}
              className="w-full custom-scrollbar"
              styles={customStyles}
              placeholder="Tags..."
              options={options}
              ref={tagInputRef}
            />
          )}

          <textarea
            name="text"
            className="custom-scrollbar w-full h-full pb-10 bg-transparent 
            resize-none p-2 text-black focus:outline-none 
            scrollbar-thin scrollbar-thumb-gray-300
             placeholder:text-black"
            value={note.text}
            onChange={handleTextChange}
            placeholder="Write your note here..."
          ></textarea>

          <div className="mt-4 flex justify-between items-center rounded-md">
            <div className="sm:hidden flex items-center gap-8">
              <button>
                <IoArrowBackOutline className='text-3xl' />
              </button>
              <div onClick={(e) => {
                e.stopPropagation()
                setPaletteIsOpen(!paletteIsOpen)
              }}>
                <LuPalette className="text-3xl" />
              </div>
            </div>

            <div
              className="hidden sm:block"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: note.color }}
            >
              <NoteColor color={color} setColor={(newColor) => changeNoteColor(id, newColor)} />
            </div>
            <div className="flex gap-2 sm:opacity-70">
              <div
                onClick={() => deleteNote(id)}
                className="p-3 m-1 hover:bg-gray-200 hover:bg-opacity-60 rounded-full cursor-pointer"
              >
                <RiDeleteBinLine className="text-3xl sm:text-lg" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`sm:hidden box-shadow absolute bottom-0 left-0 z-50 px-2 py-4 w-full  rounded-t-3xl bg-white
              ${paletteIsOpen ? 'translate-y-0' : 'translate-y-full'} duration-200`}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: color }}
      >
        <NoteColor color={color} setColor={(newColor) => changeNoteColor(id, newColor)} circleSize={'48px'} />
      </div>

    </div>
  );
};

export default Note;

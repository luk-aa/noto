import React, { useEffect, useState, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { RiDeleteBinLine } from "react-icons/ri";
import { customStyles } from "../utils/data";
import { useNotes } from "../context/GlobalContext";
import NoteColor from "./NoteColor";
import { MdNewLabel, MdOutlineNewLabel } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPalette } from "react-icons/lu";
import TagFormat from "./TagFormat";
import { FaCircle } from "react-icons/fa6";

const Note = ({ singleNote, title, text, tags, id, textColor, backgroundColor }) => {
  const { setNotes, closeNote, deleteNote, options, changeNoteColor } = useNotes();

  const [isTagInputVisible, setIsTagInputVisible] = useState(false);
  const [note, setNote] = useState({ title, text });
  const [selectedOption, setSelectedOption] = useState(tags);
  const [paletteIsOpen, setPaletteIsOpen] = useState(false)

  const tagInputRef = useRef(null);
  const editableRef = useRef(null)

  useEffect(() => {
    if (isTagInputVisible && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }, [isTagInputVisible]);

  function handleTextChange(e) {
    const titleValue = e.target.value;
    const textValue = editableRef.current.innerHTML;
    setNote((prevNote) => ({
      ...prevNote,
      title: titleValue,
      text: textValue
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
      className="fixed px-2 inset-0 flex items-center justify-center 
      bg-[#202124] bg-opacity-60 overflow-hidden z-50"
      onClick={handleSubmit}
    >
      <div
        className=" max-w-[600px] w-full max-h-[500px] h-full rounded-3xl relative z-50 overflow-hidden "
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`shadow-lg absolute w-full left-0 py-5 px-3 rounded-b-3xl z-40 transition-all 
        duration-300 ease-in-out 
        ${isTagInputVisible ? 'top-0 opacity-100 pointer-events-auto' : '-top-20 opacity-0 pointer-events-none'}`}
          style={{ backgroundColor: 'white' }}
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
        <form
          className="relative h-full flex flex-col p-3 rounded-3xl"
          style={{ backgroundColor: backgroundColor, color: textColor }}
          onSubmit={handleSubmit}
          onClick={() => {
            setPaletteIsOpen(false)
            setIsTagInputVisible(false)
          }}
        >
          <FaCircle className="text-xl" />
          <div className="pt-5 pb-2 flex items-center gap-2">
            <input
              type="text"
              name="title"
              value={note.title || ''}
              onChange={handleTextChange}
              className=" text-3xl font-medium w-full bg-transparent rounded-lg outline-none"
              placeholder="Title"
            />
            <span className={`flex items-center gap-2 text-3xl font-semibold `}>
              {singleNote.date?.day}
              <div className="flex flex-col text-xs">
                <span>{singleNote.date?.month}</span>
                <span>{singleNote.date?.year}</span>
              </div>
            </span>
          </div>


          <div className="custom-scrollbar relative w-full h-full  overflow-auto space-y-5">
            {/* Placeholder layer */}
            {note.text === '' && (
              <div className="absolute top-2 left-2 text-gray-400 pointer-events-none select-none">
                Write your note here...
              </div>
            )}
            {/* Editable div */}
            <div
              ref={editableRef}
              contentEditable
              className="min-h-[100px] bg-transparent outline-none"
              onInput={handleTextChange}
            />


            {/* Tags shown below text, inside same scrollable area */}
            <div className=" flex gap-2 flex-wrap">
              <TagFormat
                note={singleNote}
                borderColor={textColor}
                isNote={true} />
            </div>
          </div>

          <div className="mt- flex justify-between items-center rounded-md">
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
            <div
              className="hidden sm:block duration-200"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: note.backgroundColor }}
            >
              <NoteColor backgroundColor={backgroundColor} handleNoteColor={(textColor, backgroundColor) => changeNoteColor(id, textColor, backgroundColor)} />
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
        style={{ backgroundColor: backgroundColor }}
      >
        <NoteColor backgroundColor={backgroundColor} handleNoteColor={(textColor, backgroundColor) => changeNoteColor(id, textColor, backgroundColor)} circleSize={'48px'} />
      </div>

    </div >
  );
};

export default Note;

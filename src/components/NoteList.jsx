import React, { useState } from "react";
import Note from "./Note";
import { FaRegStickyNote } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { LuPalette } from "react-icons/lu";
import { useNotes } from "../context/GlobalContext";
import NoteColor from "./NoteColor";

const NoteList = () => {
  const { notes, changeNoteColor, openNote, deleteNote, gridView, highlightText, showPalette, closePalette } = useNotes(); // Get necessary functions and state from context

  const [isMenuVisible, setIsMenuVisible] = useState(null);
  const [searchParams] = useSearchParams(); // Get search and tag params from URL

  const tagFilter = searchParams.get("tag"); // Get tag filter from search params
  const searchFilter = searchParams.get("search") || ""; // Get search text from search params


  // Filter notes based on search filter
  const filteredNotesBySearch = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      note.text.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Filter notes based on tag filter
  const filteredNotesByTag = tagFilter
    ? notes.filter((note) => note.tags.some((tag) => Object.values(tag).includes(tagFilter)))
    : notes;

  // Determine the final displayed notes based on filters
  const displayedNotes = searchFilter ? filteredNotesBySearch : filteredNotesByTag;

  function handleOnMouseLeave() {
    setIsMenuVisible(null)
    closePalette()
  }

  // Map through displayed notes and generate note components
  const notesMap = displayedNotes.map((note) => (
    <div key={note.id}>
      <div
        className={`box-shadow-list relative mb-2 sm:mb-4 px-4 py-3 w-full sm:min-h-[100px] flex flex-col justify-between border-[1px] border-gray-300
        rounded-2xl break-inside-avoid break-words cursor-default duration-100
        ${note.isOpen && "opacity-0"}`}
        style={{ whiteSpace: "pre-line", backgroundColor: note.color }}
        onClick={() => openNote(note.id)} // Open note on click
        onMouseEnter={() => setIsMenuVisible(note.id)} // Show menu on hover
        onMouseLeave={() => handleOnMouseLeave()} // Hide menu when mouse leaves
      >
        {!note.title.trim() && !note.text.trim() && <h2>Note is empty</h2>}
        <h1 className={`text-[#202124] font-semibold ${note.title.trim() ? "block" : "hidden"}`}>
          {highlightText(note.title, searchFilter)} {/* Highlight search text in title */}
        </h1>
        <p className="text-sm text-[#202124] tracking-[.014em] font-normal leading-5">
          {highlightText(note.text.slice(0, 300), searchFilter)} {/* Highlight search text in body */}
          {note.text.length > 300 ? "..." : ""}
        </p>
        {note.tags.length > 0 &&
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-5">
            {note.tags.map((tag, index) => (
              <h2 key={index} className="px-3 py-1 text-xs font-semibold text-[#3c4043] bg-[#3c404320] rounded-full">
                {tag.value.length > 12
                  ? tag.value.slice(0, 23) + "..."
                  : tag.value}
              </h2>
            ))}
          </div>
        }
        <div className={`hidden mt-2 sm:flex justify-between items-center duration-300 ease-in ${isMenuVisible === note.id ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full flex justify-between gap-2" onClick={(e) => e.stopPropagation()}>
            <div
              onClick={() => showPalette(note.id)}
              className="p-2 text-[#3c4043] hover:bg-[#3c404320] rounded-full cursor-pointer"
            >
              <LuPalette className="text-md " />
            </div>
            <div
              className="p-2 text-[#3c4043] hover:bg-[#3c404320] rounded-full cursor-pointer"
              onClick={() => deleteNote(note.id)} // Delete note on click
            >
              <RiDeleteBinLine className="text-md " />
            </div>
          </div>
        </div>
        {note.isPaletteVisible && (
          <div onClick={(e) => e.stopPropagation()}
            className="bg-gray- box-shadow absolute -bottom-20 left-1/2 -translate-x-1/2 border rounded-lg w-[300px] p-2 z-50"
            style={{ backgroundColor: note.color }}
          >
            <NoteColor color={note.color} setColor={(newColor) => changeNoteColor(note.id, newColor)} circleSize={'32px'} />
          </div>
        )}
      </div>
      {note.isOpen && (
        <Note
          title={note.title}
          text={note.text}
          tags={note.tags}
          id={note.id}
          color={note.color}
        />
      )}
    </div>
  ));

  return (
    <div className={`w-full ${!gridView && 'max-w-[600px]'}`}>
      {/* If no matching notes are found */}
      {displayedNotes.length === 0 && notes.length > 0 && (
        <p className="w-fit m-auto font-semibold opacity-65">No matching results.</p>
      )}

      {/* Display "NOTES" label if there are displayed notes */}
      {displayedNotes.length > 0 && (
        <p className="ml-4 mb-2 text-xs font-semibold opacity-65">NOTES</p>
      )}

      {/* Display notes in a grid or list format based on gridView */}
      <div
        // onClick={closePalette}
        className={` ${gridView ? 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6' : 'columns-1'} gap-2 sm:gap-4 mx-auto`}
      >
        {notesMap}
      </div>

      {/* If there are no notes at all */}
      {notes.length === 0 && (
        <div className="mt-16 flex flex-col justify-center items-center gap-5 text-2xl opacity-60">
          <FaRegStickyNote className="text-7xl text-gray-300" />
          <h2>Notes you add appear here</h2>
        </div>
      )}
    </div>
  );
};

export default NoteList;

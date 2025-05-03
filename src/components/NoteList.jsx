import React, { useEffect, useState } from "react";
import Note from "./Note";
import { useSearchParams } from "react-router-dom";
import { useNotes } from "../context/GlobalContext";
import { FaCircle } from "react-icons/fa";
import TagFormat from "./TagFormat";
import cactus from '../assets/cactus.png'
import note from '../assets/notes.png'



const NoteList = () => {
  const { notes, changeNoteColor, openNote, deleteNote, gridView, highlightText, showPalette, closePalette } = useNotes(); // Get necessary functions and state from context

  const [isMenuVisible, setIsMenuVisible] = useState(null);
  const [searchParams] = useSearchParams(); // Get search and tag params from URL

  const tagFilter = searchParams.get("tag"); // Get tag filter from search params
  const searchFilter = searchParams.get("search") || ""; // Get search text from search params


  // Filter notes based on search filter
  const filteredNotesBySearch = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchFilter.toLowerCase()) ||
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

  function capitalize(word) {
    return word
      ? word[0].toUpperCase() + word.slice(1)
      : ""
  }

  const getTitlePreview = (note) => {
    const fallbackText = note.text?.split(" ").slice(0, 3).join(" ") || "";
    const rawTitle = note.title?.trim() || fallbackText;
    const isLong = rawTitle.length > 15;

    const finalText = isLong ? rawTitle.slice(0, 15) + "..." : rawTitle;
    return capitalize(finalText);
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  // Map through displayed notes and generate note components
  const notesMap = displayedNotes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`box-shadow-top relative h-64 z-[${displayedNotes.length - index}] 
        ${index === 0 ? 'mt-0' : '-mt-36'} bg-white shadow-md p-3 overflow-hidden
        rounded-3xl break-inside-avoid break-words cursor-default duration-100
        ${note.isOpen && "opacity-0"}`}
        style={{ whiteSpace: "pre-line", backgroundColor: note.backgroundColor, color: note.textColor }}
        onClick={() => openNote(note.id)} // Open note on click
        onMouseEnter={() => setIsMenuVisible(note.id)} // Show menu on hover
        onMouseLeave={() => handleOnMouseLeave()} // Hide menu when mouse leaves
      >
        <FaCircle />

        {!note.title?.trim() && !note.text?.trim() && <h2>Note is empty</h2>}
        <div className="mt-6" style={{ color: note.textColor }}>
          <div
            className=" flex flex-wrap gap-2 sm:mt-5 text-xs font-semibold"
          // style={{ color: note.textColor }}
          >
            {note.tags.length < 1 && 'Note'}
            <TagFormat note={note} />
            {note.tags.length > 2 && `+${note.tags.length - 2}`}

          </div>
          <div className="flex justify-between items-end font-medium">
            <h1 className={`clamp-1 text-3xl font-medium ${gridView ? '' : 'whitespace-nowrap'}`}>
              {highlightText(getTitlePreview(note), searchFilter)}
            </h1>
            <span className={`items-center font-semibold ${gridView ? 'w-20 rotate-90 sm:rotate-0 text-[10px] sm:text-3xl absolute sm:static top-[52px] -right-8 flex gap-1 sm:gap-2' : 'flex gap-2 text-3xl '}`}>
              {note.date?.day}
              <div className={`flex flex-co ${gridView ? 'gap-1 sm:gap-0 flex-row sm:flex-col  text-[10px] sm:text-xs' : 'text-xs flex-col'}`}>
                <span>{note.date?.month}</span>
                <span>{note.date?.year}</span>
              </div>
            </span>
          </div>
        </div>
        <p className="clamp-5 text-sm mt-2 tracking-[.014em] font-normal leading-5">
          {highlightText(note.text, searchFilter)}
        </p>
      </div>
      {note.isOpen && (
        <Note
          title={note.title}
          text={note.text}
          tags={note.tags}
          id={note.id}
          textColor={note.textColor}
          backgroundColor={note.backgroundColor}
          singleNote={note}
        />
      )}
    </div>
  ));

  return (
    <div className={`w-full px-2 pt-[68px] pb-[80px] ${!gridView && 'max-w-[600px] m-auto'}`}>
      {/* If no matching notes are found */}
      {displayedNotes.length === 0 && notes.length > 0 && (
        <div className=" flex flex-col items-center gap-2 mt-16">
          <img src={cactus} alt="cactus-icon" width={100} height={100} />
          <p className="no-results-p font-semibold">No matching results</p>
        </div>
      )}

      {/* Display notes in a grid or list format based on gridView */}
      <div
        // onClick={closePalette}
        className={`${gridView ? ' columns-2 md:columns-3 lg:columns-4 xl:columns- 2xl:columns-6' : 'columns-1'} gap-2 sm:gap-4 mx-auto`}
      >
        {notesMap}
      </div>

      {/* If there are no notes at all */}
      {notes.length === 0 && (
        <div className="mt-16 flex flex-col justify-center items-center gap-5 font-semibold">
          <img src={note} alt="notes-icon" width={100} height={100} />
          <p>Notes you add appear here</p>
        </div>
      )}
    </div>
  );
};

export default NoteList;

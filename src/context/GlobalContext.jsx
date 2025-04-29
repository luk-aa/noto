import React, { createContext, useContext, useState } from 'react'
// import { initialNote } from '../utils/data'
import { useLocalStorage } from '../hooks/useLocalStorage'

const NoteContext = createContext({})

export function useNotes() {
  return useContext(NoteContext)
}

const NoteProvider = ({ children }) => {
  // const [notes, setNotes] = useState(initialNote)
  const [notes, setNotes] = useLocalStorage('notes-app', [])

  const [takeNoteIsOpen, setTakeNoteIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState([]);
  const [gridView, setGridView] = useState(false)
  const [color, setColor] = useState('#FFFFFF');
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false)

  function closeTakeNote() {
    setTakeNoteIsOpen(false)
  }
  function openTakeNote() {
    setTakeNoteIsOpen(true)
  }

  //Generate unique tags from notes
  const uniqueTags = [...new Set(notes.flatMap((note) => note.tags.map((tag) => tag.value.trim(""))))]


  //options for CreatableSelect
  const options = uniqueTags.map(tag => ({
    value: tag,
    label: tag[0].toUpperCase() + tag.slice(1),
  }));

  function closeNote(id) {
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === id ? { ...prevNote, isOpen: false } : prevNote
      )
    );
  }
  function openNote(id) {
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === id ? { ...prevNote, isOpen: true } : prevNote
      )
    );
  }

  function showPalette(id) {
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === id ? { ...prevNote, isPaletteVisible: !prevNote.isPaletteVisible } : { ...prevNote, isPaletteVisible: false }
      )
    );
  }
  function closePalette() {
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) => ({ ...prevNote, isPaletteVisible: false }))
    );
  }

  function changeNoteColor(id, textColor, backgroundColor) {
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === id
          ? { ...prevNote, textColor: textColor, backgroundColor: backgroundColor }
          : prevNote
      )
    );
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((prevNote) => prevNote.id !== id));
  }

  const highlightText = (text, searchFilter) => {
    if (!searchFilter) return text;
    const regex = new RegExp(`(${searchFilter})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchFilter.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  function openSearchBar() {
    setSearchBarIsOpen(true)
  }

  function closeSearchBar() {
    setSearchBarIsOpen(false)
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        closeNote,
        openNote,
        deleteNote,
        options,
        uniqueTags,
        takeNoteIsOpen,
        closeTakeNote,
        openTakeNote,
        selectedOption,
        setSelectedOption,
        gridView,
        setGridView,
        color,
        setColor,
        highlightText,
        showPalette,
        closePalette,
        changeNoteColor,
        openSearchBar,
        closeSearchBar,
        searchBarIsOpen
      }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteProvider
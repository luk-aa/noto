import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../data/data";
import NoteColor from "./NoteColor";
import { useNotes } from "../context/GlobalContext";
import { MdOutlineNewLabel } from "react-icons/md";
import { MdNewLabel } from "react-icons/md";


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
  const [color, setColor] = useState('#FFFFFF');

  // Creating a reference for the textarea to dynamically adjust height
  const textAreaRef = useRef(null);

  const tagInputRef = useRef(null);

  const [isTagInputVisible, setIsTagInputVisible] = useState(options > 0);

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

  // Automatically adjusts the textarea height based on its content
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";  // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;  // Set new height based on content
    }
  }, [singleNote.text]); // Only re-run when the text content changes


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
        id: nanoid(),
        isOpen: false,
        color: color
      };

      // Update the notes in context with the new note
      setNotes((prev) => [newNote, ...prev]);

      // Reset the form to its initial state after saving
      setSingleNote({ title: "", text: "" });
      setSelectedOption([]); // Reset selected tags
      closeTakeNote(false); // Close the note form
      setColor('#FFFFFF'); // Reset color to default

      // Reset textarea height back to default
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <form
      onSubmit={saveNote}
      className={`box-shadow relative max-w-[600px] ${takeNoteIsOpen ? 'min-h-[200px]' : 'h-12'} w-full px-2 pb-10 border rounded-lg duration-300`}
      style={{ backgroundColor: color }}
      onClick={(e) => e.stopPropagation()}
    >
      {takeNoteIsOpen && (
        <>
          <div className=" flex items-center px-2 gap-2">
            <input
              type="text"
              name="title"
              value={singleNote.title}
              onChange={textChange}
              className="py-2 text-lg font-medium placeholder:text-black w-full bg-transparent rounded-lg outline-none"
              placeholder="Title"
            />
            <div
              className={` cursor-pointer`}
            >
              {!isTagInputVisible
                ? <MdOutlineNewLabel className="text-2xl" onClick={() => setIsTagInputVisible(true)} />
                : <MdNewLabel className={`text-2xl ${isTagInputVisible ? 'opacity-100' : 'opacity-0'} duration-200`} onClick={() => setIsTagInputVisible(false)} />}

            </div>
          </div>

          {isTagInputVisible && (
            <CreatableSelect
              isMulti
              name="tags"
              value={selectedOption}
              onChange={handleTagChange}
              onBlur={handleBlur}
              className="w-fit min-w-[300px]"
              styles={customStyles}
              placeholder="Tags..."
              options={options}
              ref={tagInputRef}
            />
          )}
        </>
      )}

      {/* Textarea for Note Text */}
      <textarea
        name="text"
        ref={textAreaRef} // Reference to dynamically adjust height
        className={`w-full py-3 px-2 rounded-lg outline-none 
          bg-transparent placeholder-black ${takeNoteIsOpen ? "text-sm" : "text-base font-medium"}`}
        placeholder="Collect your thoughts..."
        value={singleNote.text}
        onChange={textChange}
        rows="1" // Starts with one row
        style={{ resize: "none", overflow: "hidden", height: '100%' }} // Prevent resizing, auto-adjust height
        onClick={() => openTakeNote(true)}
      />

      {/* Show Save Button and Color Picker only if form is open */}
      {takeNoteIsOpen && (
        <div className="absolute bottom-0 left-2 right-2 flex justify-between items-center py-3 px-2 gap-2">
          <NoteColor color={color} setColor={setColor} />

          {/* Save Button */}
          <button
            type="submit"
            disabled={!(singleNote.title.trim() || singleNote.text.trim())} // Disable button if both title and text are empty
            className={`bg-blue-500 text-white px-4 py-2 
            rounded-md transition cursor-default
            ${(singleNote?.title?.trim() || singleNote?.text?.trim()) ? 'opacity-70 hover:bg-blue-600' : 'opacity-20'}`}
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
};

export default TakeNote;

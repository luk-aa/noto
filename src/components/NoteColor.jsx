import React, { useState } from 'react'
import { noteColors } from '../utils/data'
import { MdOutlineFormatColorReset } from 'react-icons/md'

const NoteColor = ({ textColor, setTextColor, backgroundColor, setBackgroundColor, handleNoteColor, circleSize }) => {
  function handleTagClick(t, b) {
    // if (setColor) {
    //   setColor(c)
    // }
    if (setTextColor && setBackgroundColor) {
      setTextColor(t)
      setBackgroundColor(b)
    }
    handleNoteColor(t, b)
  }
  return (
    <div className="flex flex-wrap gap-2">
      {noteColors.map(noteColor =>
        <div
          key={noteColor.id}
          className={`w-8 h-8 flex justify-center items-center rounded-full ${noteColor.background === backgroundColor && 'border-2 border-white shadow-lg'}`}
          style={{ backgroundColor: noteColor.background, width: circleSize, height: circleSize }}
          onClick={() => handleTagClick(noteColor.text, noteColor.background)}
        >
          <MdOutlineFormatColorReset className={`text-black ${noteColor.background !== 'white' && 'hidden'}`} />
        </div>
      )}
    </div>
  )
}

export default NoteColor
import React, { useState } from 'react'
import { noteColors } from '../utils/data'
import { MdOutlineFormatColorReset } from 'react-icons/md'

const NoteColor = ({ color, setColor, circleSize }) => {
  function handleTagClick(c) {
    if (setColor) {
      setColor(c)
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {noteColors.map(noteColor =>
        <div
          key={noteColor.id}
          className={`w-8 h-8 flex justify-center items-center rounded-full ${noteColor.color === color && 'border-2 border-white shadow-lg'}`}
          style={{ backgroundColor: noteColor.color, width: circleSize, height: circleSize }}
          onClick={() => handleTagClick(noteColor.color)}
        >
          <MdOutlineFormatColorReset className={`${noteColor.color !== '#FFFFFF' && 'hidden'}`} />
        </div>
      )}
    </div>
  )
}

export default NoteColor
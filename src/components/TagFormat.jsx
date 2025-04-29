import React from 'react'

const TagFormat = ({ note, selectedOption, borderColor, isNote }) => {
  function capitalize(word) {
    return word
      ? word[0].toUpperCase() + word.slice(1)
      : ""
  }
  return (
    <div className='flex flex-wrap gap-2'>
      {!isNote
        ? note.tags.slice(0, 2).map((tag, index) => (
          <span key={index}>
            {tag.value.length > 11
              ? tag.value.slice(0, 11) + "..."
              : capitalize(tag.value)}
          </span>
        ))
        : selectedOption.map((tag, index) => (
          <span key={index} className='border px-2 rounded text-sm'
            style={{ borderColor: borderColor }}>
            {tag.value.length > 11
              ? tag.value.slice(0, 11) + "..."
              : capitalize(tag.value)}
          </span>
        ))
      }

    </div>
  )
}

export default TagFormat
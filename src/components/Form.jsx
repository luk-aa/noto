import React from 'react'

const Form = ({ day, month, year, titleValue, textValue, textColor, handleTextChange, textInputRef }) => {
  return (
    <>
      <div className=" pt-5 pb-2  flex items-center gap-2">
        <input
          type="text"
          name="title"
          value={titleValue}
          onChange={handleTextChange}
          className=" text-3xl font-medium w-full bg-transparent rounded-lg outline-none"
          placeholder="Title"
          style={{
            '--placeholder-color': { textColor }, // use CSS var instead
          }}
        />
        <span className={`flex items-center gap-2 text-3xl font-semibold `}>
          {day}
          <div className="flex flex-col text-xs">
            <span>{month}</span>
            <span>{year}</span>
          </div>
        </span>
      </div>

      <div className=" h-full">
        <textarea
          ref={textInputRef}
          name="text"
          className="custom-scrollbar w-full h-full 
              bg-transparent resize-none   focus:outline-none 
              scrollbar-thin scrollbar-thumb-gray-300"
          value={textValue}
          onChange={handleTextChange}
          placeholder="Write your note here..."
          style={{ '--placeholder-color': { textColor } }}
        />
      </div>
    </>
  )
}

export default Form
import React from 'react'
import { customStyles } from '../utils/data'
import CreatableSelect from 'react-select/creatable'
import { useNotes } from '../context/GlobalContext'

const TagInput = ({ isTagVisible, inputRef, setTagVisible }) => {

  const { setSelectedOption, selectedOption, options } = useNotes()

  function handleTagChange(newTags) {
    setSelectedOption(newTags || []);
    if (!newTags || newTags.length === 0) {
      setTagVisible(false);
    }
  }

  function handleBlur() {
    if (selectedOption.length === 0) {
      setTagVisible(false);
    }
  }
  return (
    <div className={`shadow-lg absolute w-full left-0 py-5 px-3 bg-white rounded-b-3xl z-40 transition-all 
      duration-300 ease-in-out 
      ${isTagVisible ? 'top-0 opacity-100 pointer-events-auto' : '-top-20 opacity-0 pointer-events-none'}`}
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
        ref={inputRef}
      />
    </div>
  )
}

export default TagInput
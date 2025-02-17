import React from 'react'

const Home = () => {
  return (
    <div className='my-8 pr-2 pl-20 max-w-[1025px] m-auto flex items-center flex-col gap-16'>
      <TakeNote
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        notes={notes}
        setNotes={setNotes}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
      />
      <NoteList
        notes={notes}
        setNotes={setNotes}
        showMenu={showMenu}
        isShowMenu={isShowMenu}
        filteredNotes={filteredNotes}
        options={options}
      />
    </div>
  )
}

export default Home
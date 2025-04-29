import React, { useState } from "react";
import TakeNote from "./TakeNote";
import NoteList from "./NoteList";
// import { initialNote } from "../utils/data";
import Header from "./Header";
import SideMenu from "./SideMenu";

import { useNotes } from "../context/GlobalContext";
import NavBar from "./NavBar";
import Preloader from "./common/Preloader";


export default function Layout() {

  const { closeTakeNote, closePalette } = useNotes()

  function handleClick() {
    closeTakeNote()
    closePalette()
  }

  return (
    <div onClick={handleClick}>
      <Preloader />
      < Header />
      < NavBar />
      <main
        className=""
      >
        <TakeNote />
        <NoteList />
      </main>
    </div >
  );
}

import React, { useState } from "react";
import TakeNote from "./TakeNote";
import NoteList from "./NoteList";
import { initialNote } from "../data/data";
import Header from "./Header";
import SideMenu from "./SideMenu";

import { useNotes } from "../context/GlobalContext";


export default function Layout() {

  const { closeTakeNote, closePalette } = useNotes()

  function handleClick() {
    closeTakeNote()
    closePalette()
  }

  return (
    <div onClick={handleClick}>
      <Header />
      <SideMenu />
      <main
        className="pt-12 sm:pt-24 mb-4 pr-4 pl-[88px] flex items-center flex-col gap-5"
      >
        <TakeNote />
        <NoteList />
      </main>
    </div>
  );
}

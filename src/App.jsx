import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { AnimatePresence } from 'framer-motion'
const App = () => {
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default App
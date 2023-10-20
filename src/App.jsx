import React from 'react'
import { Link } from 'react-router-dom'

import BaseRouter from '@/routes/index.jsx'
import '@/App.css'

function App() {
  return (
    <>
      <div>
        {/* <Link to="/home">Home</Link>
        <Link to="/login">Login</Link> */}
        <BaseRouter />
      </div>
    </>
  )
}

export default App

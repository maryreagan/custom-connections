import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Auth/Auth'
import Home from './components/Home'
import Error from './components/404'
import CreateCats from './components/CreateBoard/CreateCats';

function App() {
  return (
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/auth">Auth</a></li>
        <li><a href="/create">Create</a></li>
      </ul>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<CreateCats />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
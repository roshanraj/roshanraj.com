import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Home, Works, Services, Contact, About, Navbar} from "./views/Home.jsx";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
        <Router>
          <Navbar />
          <div className="container-fluid  mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/contact" element={<Home />} />
              {/*<Route path="/about" element={<About />} />*/}
              {/*<Route path="/services" element={<Services />} />*/}
            </Routes>
          </div>
        </Router>
  )
}

export default App

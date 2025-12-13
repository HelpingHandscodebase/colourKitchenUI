import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'

// import Header from './components/header.tsx'
import Footer from './components/footer.tsx'
// import Content from './components/content.tsx'

import Navigation from './components/navigation.tsx'
import ColorsKitchen from "./components/colorsKitchen.tsx";
import Home from './components/home.tsx'
import About from './components/about.tsx'
import Project from './project.tsx'
import Services from './components/services.tsx'
import GetFreeQuote from './components/getFreeQuote.tsx'
import ConsultationForm from "./components/consultationForm.tsx";


function App() {

   // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);

  // OPEN POPUP METHOD (will be sent to Navbar)
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);


  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* NAVIGATION WITH POPUP TRIGGER */}
      <Navigation onQuoteClick={openPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colorsKitchen" element={<ColorsKitchen />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/services" element={<Services />} />
          <Route path="/getFreeQuote" element={<GetFreeQuote />} />
          {/* <Route path="/consultation-form" element={<ConsultationForm />} /> */}
        </Routes>
      <Footer />
      {/* POPUP OVERLAY */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "90%", paddingTop: "90px", maxWidth: "600px" }}
          >
            <button className="btn-close float-end" onClick={closePopup}></button>
            <ConsultationForm />
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App

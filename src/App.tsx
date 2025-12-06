import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'

import Header from './components/header.tsx'
import Footer from './components/footer.tsx'
// import Content from './components/content.tsx'

import Navigation from './components/navigation.tsx'
import ColorsKitchen from "./components/colorsKitchen.tsx";
import Home from './components/home.tsx'
import About from './components/about.tsx'
import Project from './project.tsx'
import Services from './components/services.tsx'
import GetFreeQuote from './components/getFreeQuote.tsx'
// import ConsultationForm from "./components/consultationForm.tsx";


function App() {

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colorsKitchen" element={<ColorsKitchen />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/services" element={<Services />} />
          <Route path="/getFreeQuote" element={<GetFreeQuote />} />
        </Routes>
      {/* <ConsultationForm /> */}
      <Footer />
    </BrowserRouter>
  )
}

export default App

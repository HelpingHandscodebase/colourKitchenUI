import './App.css'
import Header from './components/header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { PdfUpload } from "./components/PdfUpload";

function App() {

  // const handleUploadSuccess = (url: string) => {
  //   console.log('PDF uploaded:', url)
  // }

  return (
    <>
    <Header />
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <BrowserRouter> 
      
      {/* <h1>Hello Colour Kitchens</h1> */}
      
      {/* <PdfUpload onUploadSuccess={handleUploadSuccess} /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<PdfUpload />} />
      </Routes>
    </BrowserRouter>
    </div>
    <Footer />
    </>
  )
}

export default App

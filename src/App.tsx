import './App.css'
import Header from './components/header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
// 🛠️ RESOLVED: Changed named import { PdfUpload } to default import PdfUpload
import { PdfUpload }from "./components/PdfUpload"; 

function App() {

  // const handleUploadSuccess = (url: string) => {
  //   console.log('PDF uploaded:', url)
  // }

  return (
    <>
    <Header />
    <div className="container d-flex justify-content-center min-vh-100">
    <BrowserRouter> 
      
      {/* <h1>Hello Colour Kitchens</h1> */}
      
      {/* <PdfUpload onUploadSuccess={handleUploadSuccess} /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Note: If PdfUpload expects the onUploadSuccess prop, you'll need to pass it here: */}
        {/* <Route path="/upload" element={<PdfUpload onUploadSuccess={() => {}} />} /> */}
        <Route path="/upload" element={<PdfUpload />} /> 
      </Routes>
    </BrowserRouter>
    </div>
    <Footer />
    </>
  )
}

export default App
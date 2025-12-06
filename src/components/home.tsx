import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
// Note: Based on previous issues, using the .mjs extension or manual public copy is often required.
// Keeping your current import for demonstration, but be aware of potential worker errors.
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url"; 

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  // State to hold the total number of pages
  const [numPages, setNumPages] = useState<number | null>(null); 
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { pdfUrl?: string } | null;

    if (state?.pdfUrl) {
      setViewerUrl(state.pdfUrl);
      localStorage.setItem("pdfUrl", state.pdfUrl);
    } else {
      const saved = localStorage.getItem("pdfUrl");
      if (saved) setViewerUrl(saved);
    }
  }, [location.state]);

  // Handler to capture the total number of pages
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  }, []);

  if (!viewerUrl) {
    return <p>No PDF to show.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
      }}
    >
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      {/* Optional: Show page count while loading */}
      {numPages === null && <p>Loading document...</p>}
      {numPages !== null && <p>Total Pages: {numPages}</p>}

      <Document
        file={viewerUrl}
        onLoadSuccess={onDocumentLoadSuccess} // 🎯 Capture total page count
        onLoadError={(err) => {
          console.error("PDF Load Error:", err);
          setError(err.message);
        }}
        onSourceError={(err) => {
          console.error("PDF Source Error:", err);
          setError(err.message);
        }}
      >
        {/* 🎯 CORE FIX: Loop through all pages to display them sequentially */}
        {Array.from({ length: numPages || 0 }, (_, index) => (
          <Page 
            key={`page_${index + 1}`}
            pageNumber={index + 1} // Page numbers are 1-based
            scale={1.5}             // Adjust scale if needed
            renderTextLayer={true}   // Keep these for quality
            renderAnnotationLayer={true}
            // style={{ marginBottom: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}
          />
        ))}
      </Document>
    </div>
  );
};

export default Home;
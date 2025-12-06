import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
// Note: Based on previous issues, using the .mjs extension or manual public copy is often required.
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url"; 

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null); 
  const location = useLocation();

  // 🎯 NEW: Ref to measure the container's width
  const containerRef = useRef<HTMLDivElement>(null);
  // 🎯 NEW: State to store the dynamic width
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

  // --- Utility Functions ---
  
  // Function to update the width state based on the container ref
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      // Set the width to the container's offsetWidth
      // Use clientWidth for width excluding scrollbars, if present
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Handler to capture the total number of pages
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  }, []);

  // --- Effects ---

  // Effect to handle navigation state/local storage for PDF URL
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

  // Effect to set up and tear down the resize listener for responsiveness
  useEffect(() => {
    // 1. Initial width calculation
    updateWidth();
    
    // 2. Add listener for window resize events
    window.addEventListener('resize', updateWidth);
    
    // 3. Cleanup function
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]); // Dependency array includes updateWidth

  // --- Render ---

  if (!viewerUrl) {
    return <p>No PDF to show. Please upload a document first.</p>;
  }

  return (
    // 🎯 Use the ref on the main container to measure its width
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5px",
        // Ensure the container itself takes full available width, which is key for mobile
        width: "100%",
        boxSizing: "border-box", // Include padding in the element's total width and height
      }}
    >
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      {numPages === null && <p>Loading document...</p>}
      
      {/* Conditionally render Document only after containerWidth is measured to prevent initial flash/error */}
      {containerWidth !== undefined && (
        <Document
          file={viewerUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => {
            console.error("PDF Load Error:", err);
            setError(err.message);
          }}
          onSourceError={(err) => {
            console.error("PDF Source Error:", err);
            setError(err.message);
          }}
        >
          {Array.from({ length: numPages || 0 }, (_, index) => (
            <Page 
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              // 🎯 THE FIX: Pass the measured container width.
              // This scales the PDF page to fit the container perfectly.
              width={containerWidth} 
              
              // ❌ REMOVED: scale={1.5}
              
              renderTextLayer={true}
              renderAnnotationLayer={true}
              // Optional: Add styling to the Page component's div wrapper
              // style={{ marginBottom: '10px' }} 
            />
          ))}
        </Document>
      )}
    </div>
  );
};

export default Home;
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pdfjs, Document, Page } from 'react-pdf';

// ---------------------------------------------------------------------
// 🎯 CRITICAL FIX: CONFIGURE PDF.JS WORKER FOR VITE/MODERN BUILDERS
// This must be placed at the top of the file that imports <Document>
// ---------------------------------------------------------------------

// Import pdfjs-dist's worker file using the new URL method (Vite specific fix)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Include necessary CSS styles for proper display of text selection and annotations
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// ---------------------------------------------------------------------

/**
 * A component to display a PDF using the react-pdf library.
 * It expects the PDF URL to be passed via React Router's state.
 */
export function PdfViewer() {
  const location = useLocation();
  // Retrieve the pdfUrl passed from the PdfUpload component's navigation state
  const pdfUrl = location.state?.pdfUrl;

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  if (!pdfUrl) {
    return <div>No PDF URL provided. Please upload a file first.</div>;
  }

  return (
    <div className="pdf-viewer-container">
      <h2>Viewing Uploaded PDF</h2>
      <div className="pdf-controls">
        <button
          onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <span>Page {pageNumber} of {numPages ?? '--'}</span>
        <button
          onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages ?? prev))}
          disabled={pageNumber >= (numPages ?? 1)}
        >
          Next
        </button>
      </div>

      <div className="pdf-display">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Loading PDF Document...</div>}
          error={<div>Error loading PDF. Please check the URL.</div>}
        >
          {/* Display the selected page */}
          <Page pageNumber={pageNumber} width={800} />
        </Document>
      </div>
    </div>
  );
}
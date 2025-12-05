import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
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

  if (!viewerUrl) {
    return <p>No PDF to show.</p>;
  }

  return (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      overflowY: "auto",
      paddingTop: "20px",
    }}
  >
    <embed
      src={viewerUrl}
      type="application/pdf"
      style={{
        width: "65%",
        height: "95vh",
        border: "none",
      }}
    />
  </div>
);

};

export default Home;

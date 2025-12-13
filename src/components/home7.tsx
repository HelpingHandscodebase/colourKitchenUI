import { useState, useEffect } from "react";

import img1 from "/colours-kitchen-img/colours-kitchen.jpg";
import img2 from "/colours-kitchen-img/colours-kitchen1.jpg";
import img3 from "/colours-kitchen-img/colours-kitchen2.jpg";
import img4 from "/colours-kitchen-img/colours-kitchen3.jpg";
import img5 from "/colours-kitchen-img/colours-kitchen4.jpg";

// All real images (do NOT repeat them here)
const images = [img1, img2, img3, img4, img5];

export default function Home7() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Desktop default = 3

  // Responsive images count
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // Mobile = 1 image
      } else {
        setVisibleCount(3); // Desktop = 3 images
      }
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Next Slide
  const next = () => {
    setStartIndex((prev) => (prev + 1) % images.length);
  };

  // Previous Slide
  const prev = () => {
    setStartIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Compute visible images dynamically
  const visibleImages = Array.from({ length: visibleCount }).map(
    (_, i) => images[(startIndex + i) % images.length]
  );

  // Change slide by clicking dot
  const goToSlide = (i: number) => setStartIndex(i);

  return (
    <div className="container text-center py-5">
      <h2 className="fw-semibold">51040 Design Possibilities In Our Experience Centres</h2>
      <p className="text-muted mb-4">1 Cities | 10 Experience Centres</p>

      <div className="position-relative">

        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          className="btn btn-light shadow rounded-circle position-absolute top-50 start-0 translate-middle-y"
          style={{ zIndex: 10 }}
        >
          ❮
        </button>

        {/* SLIDER IMAGES */}
        <div className="d-flex justify-content-center gap-3">
          {visibleImages.map((src, i) => (
            <div key={i} style={{ width: visibleCount === 1 ? "90%" : "30%" }}>
              <img
                src={src}
                className="img-fluid shadow-sm p-2"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          className="btn btn-light shadow rounded-circle position-absolute top-50 end-0 translate-middle-y"
          style={{ zIndex: 10 }}
        >
          ❯
        </button>
      </div>

      {/* DOTS — ONLY FOR MOBILE */}
      {visibleCount === 1 && (
        <div className="d-flex justify-content-center mt-3 gap-2">
          {images.map((_, i) => {
            const active = i === startIndex;
            return (
              <div
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: active ? "12px" : "10px",
                  height: active ? "12px" : "10px",
                  borderRadius: "50%",
                  backgroundColor: active ? "#6c757d" : "#d3d3d3",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

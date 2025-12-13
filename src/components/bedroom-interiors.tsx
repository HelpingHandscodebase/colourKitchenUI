import { useState, useEffect } from "react";

import img1 from "/colours-kitchen-img/colours-kitchen.jpg";
import img2 from "/colours-kitchen-img/colours-kitchen1.jpg";
import img3 from "/colours-kitchen-img/colours-kitchen2.jpg";
import img4 from "/colours-kitchen-img/colours-kitchen3.jpg";
import img5 from "/colours-kitchen-img/colours-kitchen4.jpg";

// Slide Data — Image + Text
const slides = [
  { img: img1, title: "Skirting Drawers To Utilise The Dead Space" },
  { img: img2, title: "A TV Unit With Hidden Storage Behind" },
  { img: img3, title: "A Magic Pull-Out To Store Your Daily Utensils" },
  { img: img4, title: "Maximise Your Modular Kitchen Storage" },
  { img: img5, title: "Smart Interior Solutions For Your Home" }
];

export default function BedRoomInteriors() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Handle responsive view
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else setVisibleCount(3);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Next / Prev
  const next = () =>
    setStartIndex((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setStartIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Compute visible cards
  const visibleSlides = Array.from({ length: visibleCount }).map(
    (_, i) => slides[(startIndex + i) % slides.length]
  );

  return (
    <div className="container text-center py-5">
      <h2 className="fw-semibold mt-0">Bedroom Interiors For Comfort And Style</h2>
      <div className="position-relative">

        {/* Left Button */}
        <button
          onClick={prev}
          className="btn btn-light shadow rounded-circle position-absolute top-50 start-0 translate-middle-y"
          style={{ zIndex: 10 }}
        >
          ❮
        </button>

        {/* Slider */}
        <div className="d-flex justify-content-center gap-4">
          {visibleSlides.map((item, i) => (
            <div
              key={i}
              style={{
                width: visibleCount === 1 ? "90%" : "30%",
                cursor: "pointer"
              }}
            >
              <img
                src={item.img}
                className="img-fluid shadow-sm"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              {/* Text Under Image */}
              <p className="mt-2 fw-semibold" style={{ fontSize: "15px" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={next}
          className="btn btn-light shadow rounded-circle position-absolute top-50 end-0 translate-middle-y"
          style={{ zIndex: 10 }}
        >
          ❯
        </button>
      </div>

      {/* Dots Only in Mobile */}
      {visibleCount === 1 && (
        <div className="d-flex justify-content-center mt-3 gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setStartIndex(i)}
              style={{
                width: i === startIndex ? "12px" : "10px",
                height: i === startIndex ? "12px" : "10px",
                borderRadius: "50%",
                backgroundColor: i === startIndex ? "#6c757d" : "#d3d3d3",
                transition: "0.3s",
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      )}
      <div className="container mt-4">
          <button  className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
                Meet Our Designers
            </button>
        </div>
    </div>
  );
}

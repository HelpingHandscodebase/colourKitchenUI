import img1 from '/img/Photo/img1.jpg';
import img2 from '/img/Photo/img2.jpg';
import img3 from '/img/Photo/img3.jpg';

const Home7 = () => {
  return (
    <div className="container text-center py-5">
        <h2 className="fw-semibold">51040 Design Possibilities In Our Experience Centres</h2>
        <p className="text-muted mb-5">1 Cities | 10 Experience Centres</p>
        <div className="row g-4 justify-content-evenly">
          <div className="col-12 col-md-4">
            <img
              src={img3}
              className="img-fluid rounded shadow-sm"
              alt="xyz"
            />
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img2}
              className="img-fluid rounded shadow-sm"
              alt="xyz"
            />
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img1}
              className="img-fluid rounded shadow-sm"
              alt="xyz"
            />
          </div>
        </div>
    </div>
  )
}

export default Home7
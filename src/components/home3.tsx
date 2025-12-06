import img1 from '/img/Photo/img1.jpg';
import img2 from '/img/Photo/img2.jpg';
import img3 from '/img/Photo/img3.jpg';

const Home3 = () => {
  return (
    <div className="container bg-dark-subtle text-center py-5">
        <h2 className="fw-semibold">Personalised Space Saving Solutions</h2>
        <p className="text-muted mb-5">20% Extra Space Guaranteed</p>
        <div className="row g-4 justify-content-evenly">
          <div className="col-12 col-md-4">
            <img
              src={img1}
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
              src={img3}
              className="img-fluid rounded shadow-sm"
              alt="xyz"
            />
          </div>
        </div>
        

        <div className="container mt-4">
          <button  className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
                Talk to our Space Saving Expert
            </button>
        </div>
    </div>
  )
}

export default Home3
import img1 from '/img/Photo/img1.jpg';
import img2 from '/img/Photo/img2.jpg';
import img3 from '/img/Photo/img3.jpg';

const Home3 = () => {
  return (
    <div className="bg-secondary">
        <h2>Personalised Space Saving Solutions</h2>
        <p>20% Extra Space Guaranteed</p>

        <img src={img1} alt="xyz" width={1165} height={360} />
        <img src={img2} alt="xyz" width={1165} height={360} />
        <img src={img3} alt="xyz" width={1165} height={360} />

        <div className="container mt-4">
            <button className="btn btn-danger">Talk to our Space Saving Expert</button>
        </div>
    </div>
  )
}

export default Home3
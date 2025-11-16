import image1 from '/img/image1.png';
import image2 from '/img/image2.png';
import image3 from '/img/image3.png';
import image4 from '/img/image4.png';
import image5 from '/img/image5.png';
import image6 from '/img/image6.png';

const Home5 = () => {
  return (
    <div>
        <h2>What You Get</h2>
        {/* <img src="/img/image1.png" alt="Innovative Storage" width={95} height={101} /> */}
        <img src={image1} alt="Innovative Storage" width={95} height={101} />
        <h5>Innovative Storage</h5>
        <p>TV Unit, TV Back Panelling, Crockery Unit, Bar Unit, Bookshelf.</p>
        <img src={image2} alt="Bedroom" width={95} height={101} />
        <h5>Bedroom</h5>
        <p>Wardrobes, TV Unit, Bed with Storage, Dressing Unit, Study Unit.</p>
        <img src={image3} alt="Kitchen" width={95} height={101} />
        <h5>Kitchen</h5>
        <p>Countertops, Backsplashes, Accessories, Shutters, Storage.</p>
        <img src={image4} alt="Innovative Storage" width={95} height={101} />
        <h5>Innovative Storage</h5>
        <p>Janitor Unit, Skirting Drawer, Pantry Pull Out, Appliance Garage, Hidden Bar Cabinet, Magic Corner.</p>
        <img src={image5} alt="Interior Design Services" width={95} height={101} />
        <h5>Interior Design Services</h5>
        <p>False Ceiling, Wall Panelling, Decor Accents, Lighting, Furnishing, Appliances.</p>
        <img src={image6} alt="Home Improvement Services" width={95} height={101} />
        <h5>Home Improvement Services</h5>
        <p>Painting, Bathroom Remodelling, Tiling, Plumbing, Electrical, Civil Work, Deep Cleaning.</p>
        <div className="container mt-4">
            <button className="btn btn-danger">Get Free Estimate</button>
        </div>
    </div>
  )
}

export default Home5
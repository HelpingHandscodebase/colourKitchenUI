import profile1 from '/img/Deepak-Kumar.jpg';
import profile2 from '/img/Aditya-Sinha.jpg';
import family1 from '/img/family1.jpg';
import family2 from '/img/family2.jpg';

const Home6 = () => {
  return (
    <div>
        <h2>15000+ Happy Homes</h2>
        <img src={profile1} alt="Deepak Kumar" width={134} height={125}/>
        <h5>Deepak Kumar</h5>
        <p>Bilaspur, Chhattisgarh</p>

        <p>Colours Kitchen gave us a home we always wanted. The journey from idea to execution was smooth and having them on board transform our home was a great decision.</p>
        <img src={family1} alt="family1" width={540} height={324} />


        <img src={profile2} alt="Aditya Sinha" width={134} height={125} />
        <h5>Aditya Sinha</h5>
        <p>Korba, Chhattisgarh</p>

        <p>Overall an excellent job done by Colours Kitchen. Truly overwhelmed by the complete design and execution of the project. Love the storage solutions provided in the kitchen.</p>
        <img src={family2} alt="family2" width={540} height={324} />

        <div className="container mt-4 pb-4">
            <button className="btn btn-danger">Book A Free Consultation</button>
        </div>
    </div>
  )
}

export default Home6
import Home2 from "./home2";
import Home3 from "./home3";
import Home4 from "./home4";
import Home5 from "./home5";
import Home6 from "./home6";
import Home7 from "./home7";
import Home8 from "./home8";

const Home = () => {
  return (
    <div>
      <div
        // className="cover-section d-flex align-items-center justify-content-center text-center"
        className="cover-section position-relative"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "75vh",
        }}
      />
      <Home2 />
      <Home3 />
      <Home4 />
      <Home5 />
      <Home6 />
      <Home7 />
      <Home8 />
    </div>
  );
};

export default Home;

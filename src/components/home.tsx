import Home2 from "./home2"
import Home3 from "./home3"
import Home4 from "./home4"
import Home5 from "./home5"
import Home6 from "./home6"
import Home7 from "./home7"
import Home8 from "./home8"

const Home = () => {
  return (
    <div>
      <img src="/hero.jpg" alt="cover section" width="1440" height="402" />
      {/* <div className="container mt-4">
        <h1 className="text-primary">Custom SCSS Bootstrap Theme</h1>
        <button className="btn btn-danger">Click Me</button>
      </div> */}
      <Home2 />
      <Home3 />
      <Home4 />
      <Home5 />
      <Home6 />
      <Home7 />
      <Home8 />
    </div>
  )
}

export default Home
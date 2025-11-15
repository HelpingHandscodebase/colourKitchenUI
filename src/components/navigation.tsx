import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/colorsKitchen">Colors Kitchen</Link>
        <Link to="/home">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/project">PROJECT</Link>
        <Link to="/services">SERVICES</Link>
        <a href="https://wa.me/987654123" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
        </a>
        <form className="justify-content-last">
          {/* <Link to="/getFreeQuote">Get Free Quote</Link> */}
          <button className="btn btn-outline-success me-2" type="button">Get Free Quote</button>
        </form>
      </div>
    </nav>
  )
}

export default Navigation
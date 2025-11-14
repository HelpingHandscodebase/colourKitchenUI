import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav>
        <li><Link to="/colorsKitchen">Colors Kitchen</Link></li>
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/project">PROJECT</Link></li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><a href="https://wa.me/987654123" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
        </a></li>
        <li><Link to="/getFreeQuote">Get Free Quote</Link></li>
    </nav>
  )
}

export default Navigation
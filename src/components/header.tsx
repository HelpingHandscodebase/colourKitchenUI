import React from 'react'
import Logo from "../assets/Logo1.png";

const Header: React.FC = () => {
  return (
    <header className="bg-light py-3 px-4 w-100">
        <div className="d-flex align-items-center">
            <img 
        src={Logo} 
        alt="Logo" 
        style={{ height: "60px", width: "110px", objectFit: "cover", marginRight: "12px" }}
      />
      <h2 className="text-white m-0"></h2>
        </div>
    </header>
  )
}

export default Header
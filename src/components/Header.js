import React from 'react';
import LogoHRYC from "../assets/images/LogoHRYC.jpg";
import MIAlogo from "../assets/images/logo-mia.png";
import LogoIrycis from "../assets/images/logo-irycis.png";
// import LogoUser from "../assets/images/user.png";

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo-section">
        <img src={LogoHRYC} alt="HRYC logo" className="logo" />
        <img src={LogoIrycis} alt="Irycis logo" className="logo" />
        {/* <img src={MIAlogo} alt="MIA logo" className="logo" /> */}
      </div>
  {/* Cierre de sesión  */}
  {/* <div class="user-section">
    <img src={LogoUser}  alt="Avatar" class="user-avatar"/>
    <span class="user-name">{props.name}</span>
    <button onClick={props.closeSession} class="logout-btn">Cerrar Sesión</button>
  </div> */}
</header>
  );
}

export default Header;
        

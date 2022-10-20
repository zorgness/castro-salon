import React from "react";
import Insta from '../images/insta.png'


const instagram = 'https://www.instagram.com/anais.d.c/?hl=fr';


const Footer = () => (

  <div className="footer d-flex justify-content-around ">



      <div className="m-3">
        <img src={Insta} alt="instagram" className="avatar-large"  />
      </div>



  </div>
);

export default Footer;

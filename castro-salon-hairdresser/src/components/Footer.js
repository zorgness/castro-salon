import React from "react";
import Insta from '../images/insta.png'
import { Link } from "react-router-dom";

const instagram = 'https://www.instagram.com/anais.d.c/?hl=fr';


const Footer = () => (

  <div className="footer d-flex justify-content-around ">



      <div className="m-3">
        <a href={instagram}><img src={Insta} alt="instagram" className="avatar-large"  /></a>
      </div>



  </div>
);

export default Footer;

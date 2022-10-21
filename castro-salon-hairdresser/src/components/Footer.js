import React from "react";
import Insta from '../images/insta.png'


const instagram = process.env.REACT_APP_INSTAGRAM_URL


const Footer = () => (

  <div className="footer d-flex justify-content-around ">



      <div className="m-3">
        <a href={instagram}><img src={Insta} alt="instagram" className="avatar-large"  /></a>
      </div>



  </div>
);

export default Footer;

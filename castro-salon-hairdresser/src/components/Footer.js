import React from "react";
import Insta from '../images/insta.png'
import Facebook from '../images/facebook.png'
import Linkdin from '../images/linkdin.png'


const Footer = () => (

  <div className="footer d-flex justify-content-around ">

      <div className="m-3">
        <img src={Facebook} alt="facebook" className="avatar-large" />
      </div>

      <div className="m-3">
        <img src={Insta} alt="instagram" className="avatar-large"  />
      </div>

     <div className="m-3">
        <img src={Linkdin} alt="linkdin" className="avatar-large"  />
     </div>

  </div>
);

export default Footer;

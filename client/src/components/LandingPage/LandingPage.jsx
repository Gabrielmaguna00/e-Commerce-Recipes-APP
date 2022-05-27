import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import video from "../../Image/videocomida.mp4";

export default function Landing() {
  return (
    <div className="fondo">
      <h1 className="titulo">
        <center>Welcome</center>
      </h1>
      <div className="boton_ingreso">
        <Link to="/home" className="btn-neon">
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
          <span id="span4"></span>
          ENTER
        </Link>
      </div>
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="capa"></div>
    </div>
  );
}

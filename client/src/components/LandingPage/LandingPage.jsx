import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";
import video from "../../Image/videocomida.mp4";
import getDiets from "../../actions/index";

export default function Landing() {
  const dispatch = useDispatch();
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

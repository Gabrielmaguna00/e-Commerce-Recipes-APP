import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css'

export default function Landing (){

    return(
        <div className='fondo'>
            <h1 className="titulo" ><center>Welcome</center></h1>
            <div className='boton_ingreso'>
            <Link to='/home' className="btn-neon">
                <span id="span1"></span>
                <span id="span2"></span>
                <span id="span3"></span>
                <span id="span4"></span>
                    ENTER                 
            </Link>
            </div>
        </div>
    )
}
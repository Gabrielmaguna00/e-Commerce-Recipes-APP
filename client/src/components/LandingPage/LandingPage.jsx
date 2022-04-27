import React from "react";
import {Link} from 'react-router-dom';
import { getDiets } from "../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import './Landing.css'


export default function Landing (){
const dispatch=useDispatch()

useEffect(()=>{
    dispatch(getDiets())        
    }, [dispatch])

    return(
        <div className='fondo'>
            <h1 className="titulo" ><center>Welcome</center></h1>
            <div className='boton_ingreso'>
            <Link to='/home'>
                <button className='ingreso'>                                       
                    GET IN                 
                </button>
            </Link>
            </div>
        </div>
    )
}
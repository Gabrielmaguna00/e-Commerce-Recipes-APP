import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdetail, reset } from '../../actions/index'
import { useEffect } from "react";
import styles from "./Detail.css"


export default function Detail (){
    let params=useParams()
    console.log(params)
    console.log(params.id)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getdetail(params.id));
        return ()=>{
            dispatch(reset())
        }
    },[])
    const recipe=useSelector((state)=>state.detail)    
    console.log('esto es recipe: ', recipe)
    // let sumary=recipe.summary
    // console.log(typeof recipe.suma)
    // var aux = sumary.replace(/<[^>]+>/g, '');
    // console.log(aux)
    return(
        <div className={styles.det}>
            {
            recipe.title?
            <div className="todo">
                <h1 className="info">{recipe.title}</h1>
                <img src={recipe.image} alt="img not found" />
                <h2 className="info">diets: </h2><p className="info_text">{recipe.diets.map(e=>e)}</p>
                {/* <h5>dishtypes:{recipe.dishTypes+(' ')}</h5> */}
                <h2 className="info">SUMMARY: </h2>{(<p className="info_text" dangerouslySetInnerHTML={{__html: recipe.summary}}></p>)}
                {recipe.steps===''?<></>:<><h2 className="info">steps: </h2><p className="info_text">{recipe.steps}</p></>}                
                <h2 className="info">Diets:</h2><p className="info_text">{recipe.diets+' '}</p>
                <h2  className="info">Score:</h2 ><p className="info_text">{recipe.spoonacularScore}</p>
                <h2  className="info">Puntuacion saludable:</h2 ><p className="info_text">{recipe.healthScore}</p>
            </div>: <p>loading...</p>
            }

            <Link to='/home'>
                <button className="boton">volver</button>
            </Link>
        </div>
    )
}
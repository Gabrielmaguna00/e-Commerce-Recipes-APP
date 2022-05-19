import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdetail, reset } from "../../actions/index";
import { useEffect } from "react";
import styles from "./Detail.css";
import fondo from "../../Image/detalle-1PRUEBA.jpg";

export default function Detail() {
  let params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getdetail(params.id));
    return () => {
      dispatch(reset());
    };
  }, []);
  const recipe = useSelector((state) => state.detail);
  return (
    <div>
      <div className="container__detail">
        {recipe.title ? (
          <div className="todo">
            <h1 className="info">{recipe.title}</h1>
            <img
              className="imagen__detalle"
              src={recipe.image}
              alt="img not found"
            />
            <div className="text__detail">
              <h2 className="info">Diets:</h2>
              <p className="info_text">{recipe.diets + " "}</p>
              {/* <h5>dishtypes:{recipe.dishTypes+(' ')}</h5> */}
              <h2 className="info">Summary: </h2>
              {
                <p className="info_text">
                  {recipe.summary.replace(/<[^>]*>?/g, "")}
                </p>
              }
              {recipe.steps === "" ? (
                <></>
              ) : (
                <>
                  <h2 className="info">Steps: </h2>
                  <p className="info_text">{recipe.steps}</p>
                </>
              )}
              <div className="scores__detail">
                {recipe.spoonacularScore && (
                  <div className="score_detail">
                    <h2 className="info">Score:</h2>
                    <p className="info_text">{recipe.spoonacularScore}</p>
                  </div>
                )}
                <div className="score_detail">
                  <h2 className="info">Healthy punctuation:</h2>
                  <p className="info_text">{recipe.healthScore}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>loading...</h1>
        )}
        <Link to="/home">
          <button className="boton">BACK</button>
        </Link>
      </div>
      <div className="fondo__detalle">
        <img className="img__detalle" src={fondo} alt="" />
      </div>
    </div>
  );
}

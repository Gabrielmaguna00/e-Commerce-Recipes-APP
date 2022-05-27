import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdetail, reset } from "../../actions/index";
import { useEffect } from "react";
import "./Detail.css";
import fondo from "../../Image/detalle-1PRUEBA.jpg";
import { deleteRecipe } from "../../actions";
import Swal from "sweetalert2";

export default function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getdetail(params.id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, params.id]);
  const recipe = useSelector((state) => state.detail);
  const healthDelete = (e) => {
    e.preventDefault()
    dispatch(deleteRecipe(params.id));
    Swal.fire({
      title: "Success!",
      text: "Deleted Recipe!",
      icon: "success",
      confirmButtonText: "Ok!",
    }).then(function () {
      navigate("/home");
    });  };
  console.log(recipe);
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
                <div className="score_detail">
                  <h2 className="info">Healthy punctuation:</h2>
                  <p className="info_text">{recipe.healthScore}</p>
                </div>
                {recipe.createdInDB === true ? (
                  <Link to="/home">
                    <button
                      onClick={(e) => healthDelete(e)}
                      className="boton_delete"
                    >
                      Delete
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
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

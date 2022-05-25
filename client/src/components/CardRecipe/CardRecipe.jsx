import React from "react";
import "./CardRecipe.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../actions";

export default function Card({
  title,
  image,
  diets,
  healthScore,
  dishTypes,
  createdInDB,
  id
}) {
  const dispatch = useDispatch();
  const healthDelete =()=>{
    dispatch(deleteRecipe(id))
  }
  console.log(healthScore);
  return (
    <div className="card">
      <img src={image} alt="" width="200px" height="250px" />
      <div className="text__card">
        <h4>{title}</h4>
        <p>
          Diets:{" "}
          {createdInDB
            ? diets.map((e) => e.name + " ")
            : diets.map((e) => e + " ")}
        </p>
        <p>{dishTypes}</p>
        <p>healthScore: {healthScore}</p>
      </div>
    </div>
  );
}

// let handleFilterByNameOrScore=(e)=>{
//     e.target.value==='name'?
//     dispatch(filterByScore(e.target.value))
//     setCurrentPage(1)
//     setOrder(`order ${e.target.value}`)
// }

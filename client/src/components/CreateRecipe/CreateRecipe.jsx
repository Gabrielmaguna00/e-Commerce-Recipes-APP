import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipes } from "../../actions";
import "./CreateRecipe.css";
import fondo_create from "../../Image/fondo.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const validate = (input) => {
  let errors = {};
  if (!input.title) {
    errors.title = "a name is required!";
  } else if (!input.summary) {
    errors.summary = "A summary of the dish is required!";
  } else if (!input.healthScore) {
    errors.healthScore = "A healthy level of food is required";
  } else if (!(input.healthScore >= 0)) {
    errors.spoonacularScore = "Enter a number greater than or equal to 0";
  } else if (!input.steps) {
    errors.steps = "A step by step recipe is required";
  }
  return errors;
  // (!input.title)?errors.title='se requiere un nombre!':(!input.summary?errors.summary='Se requiere un resumen del plato!':(!input.spoonacularScore?errors.spoonacularScore='Se requiere una puntuacion al plato (del 1 al 100)':(!input.healthScore?errors.healthScore='Se requiere un nivel de comida saludable':(!input.steps?errors.steps='Se requiere un paso a paso de la receta':errors={}))))
  // return errors
};

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    steps: "",
    image: "",
    diets: [],
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSelect = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  };
  const handleSubmit = (e) => {
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      alert("faltan valores por ingresar!");
    } else {
      e.preventDefault();
      dispatch(postRecipes(input));
      alert("receta creada");
      setInput({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        steps: "",
        diets: [],
        image: "",
      });
    }
  };
  const handleDeletediets = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== e),
    });
  };

  return (
    <div className="conteiner">
      <Link to="/home">
        <button
          className="boton__create
        "
        >
          BACK
        </button>
      </Link>{" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create your recipe</h1>
        <div className="form__CreateRecipe">
          <label className="descripcion">Title:</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
            className="input__create"
          />
          {errors.title && (
            <span className="error__create">{errors.title}</span>
          )}
          <label className="descripcion">Summary:</label>
          <textarea
            name="summary"
            rows="4"
            value={input.summary}
            onChange={(e) => {
              handleChange(e);
            }}
            className="textarea__createrecipe"
          ></textarea>
          {errors.summary && (
            <span className="error__create">{errors.summary}</span>
          )}
          <label className="descripcion">HealthScore:</label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => {
              handleChange(e);
            }}
            className="number__create"
          />
          {errors.healthScore && (
            <span className="error__create">{errors.healthScore}</span>
          )}
          <label className="descripcion">Steps:</label>
          <textarea
            name="steps"
            value={input.steps}
            onChange={(e) => {
              handleChange(e);
            }}
            rows="4"
            className="textarea__createrecipe"
          />
          {errors.steps && (
            <span className="error__create">{errors.steps}</span>
          )}
          <label className="descripcion">Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => {
              handleChange(e);
            }}
            className="input__create"
          />
          {errors.image && (
            <span className="error__create">{errors.image}</span>
          )}
          <label className="descripcion">Diets</label>
          <select onChange={(e) => handleSelect(e)} className="select__create">
            <option disabled selected>
              None
            </option>
            {diets.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {console.log(
            "caso a: ",
            Object.keys(errors).length > 0,
            " caso b : ",
            input.title.length === 0
          )}
          {Object.keys(errors).length > 0 || input.title.length === 0 ? (
            <label>Incomplete Form</label>
          ) : (
            <button type="submit" className="button2">
              Create
            </button>
          )}
          {input.diets.map((e) => (
            <div className="conteiner_diets_create">
              <p className="diets_create">{e}</p>
              <DeleteForeverIcon
                onClick={() => handleDeletediets(e)}
                className="icon__delete"
              ></DeleteForeverIcon>
            </div>
          ))}
        </div>
      </form>
      <div className="fondo__create">
        <img className="img__create" src={fondo_create} alt="" />
      </div>
    </div>
  );
}

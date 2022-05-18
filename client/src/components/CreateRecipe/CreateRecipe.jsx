import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipes } from "../../actions";
import "./CreateRecipe.css";

const validate = (input) => {
  let errors = {};
  if (!input.title) {
    errors.title = "se requiere un nombre!";
  } else if (!input.summary) {
    errors.summary = "Se requiere un resumen del plato!";
  } else if (!input.spoonacularScore) {
    errors.spoonacularScore =
      "Se requiere una puntuacion al plato (del 1 al 100)";
  } else if (!(input.spoonacularScore >= 0)) {
    errors.spoonacularScore = "Colocar un numero mayor o igual a 0";
  } else if (!input.healthScore) {
    errors.healthScore = "Se requiere un nivel de comida saludable";
  } else if (!input.steps) {
    errors.steps = "Se requiere un paso a paso de la receta";
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
    healthScore: "",
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
      console.log(input.diets);
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
        <button className="boton__create">BACK</button>
      </Link>{" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Crea tu receta</h1>
        <div>
          <p className="descripcion">title:</p>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
            className="in"
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <p className="descripcion">summary:</p>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => {
              handleChange(e);
            }}
            className="in"
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div>
          <p className="descripcion">score:</p>
          <input
            type="number"
            value={input.spoonacularScore}
            name="spoonacularScore"
            onChange={(e) => {
              handleChange(e);
            }}
            className="in"
          />
          {errors.spoonacularScore && <p>{errors.spoonacularScore}</p>}
        </div>
        <div>
          <p className="descripcion">healthScore:</p>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => {
              handleChange(e);
            }}
            className="in"
          />
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>
        <div>
          <p className="descripcion">steps:</p>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => {
              handleChange(e);
            }}
            className="in"
          />
          {errors.steps && <p>{errors.steps}</p>}
        </div>
        <div>
          <p className="descripcion">imagen:</p>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => {
              handleChange(e);
            }}
            className="in"
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <p className="descripcion">diets</p>
        <select onChange={(e) => handleSelect(e)}>
          {diets.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        {console.log(
          "esto es errors: ",
          errors.length,
          Object.keys(errors).length > 0
        )}
        {Object.keys(errors).length > 0 ? (
          <p>falta completar</p>
        ) : (
          <button type="submit" className="button2">
            Crear
          </button>
        )}

        <p className="diets">
          {input.diets.map((e) => (
            <div>
              <ul>
                <li>
                  {e}
                  <button
                    className="close"
                    onClick={() => handleDeletediets(e)}
                  >
                    x
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </p>
      </form>
    </div>
  );
}

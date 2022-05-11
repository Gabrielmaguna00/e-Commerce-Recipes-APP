import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  getDiets,
  filterRecipesPerDiets,
  filterByName,
  filterByScore,
  getHome,
} from "../../actions";
import Card from "../CardRecipe/CardRecipe";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import { ImHome } from "react-icons/im";
import fondo from "../../Image/landing.jpg"

export default function Home() {
  const dispatch = useDispatch();
  const standRecipes = useSelector((state) => state.allRecipes);
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  // const nameOrScore = useSelector((state) => state.nameOrScore);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");
  const [asc_des, setAsc_Des] = useState({ asc: "asc", des: "des" }); //estado local para ver en que posicion se desea ordenar. si ascendente o descendente
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const lastPositionRecipe = currentPage * recipesPerPage;
  const indexFirstPositionRecipe = lastPositionRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(
    indexFirstPositionRecipe,
    lastPositionRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //traigo las dietas para mostrarlas en mi select, en caso que el estado este vacio: despacho mi action
    allDiets.length === 0 && dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    //guardo el estado que recibi de /recipes, para que en caso de tener que utilizarlo no debe hacer otro llamado a la api, provocando una agilizacion de la app
    standRecipes.length === 0 && dispatch(getRecipes());
  }, [dispatch]);

  let handleHome = () => {
    dispatch(getHome());
  };

  let handleFilterRecipesByDiets = (e) => {
    setCurrentPage(1);
    dispatch(filterRecipesPerDiets(e.target.value));
  };
  let handleFilterOrder = (e) => {
    setAsc_Des("");
    handleFilterByName(e);
  };
  let handleFilterByName = (e) => {
    if (e.hasOwnProperty("target")) {
      dispatch(filterByName(e.target.value));
      setCurrentPage(1);
      setOrder(`order ${e.target.value}`);
    } else {
      dispatch(filterByName(e));
      setCurrentPage(1);
      setOrder(`order2 ${e}`);
    }
  };
  let handleFilterByScore = (e) => {
    if (e.hasOwnProperty("target")) {
      dispatch(filterByScore(e.target.value));
      setCurrentPage(1);
      setOrder(`order ${e.target.value}`);
    } else {
      dispatch(filterByScore(e));
      setCurrentPage(1);
      setOrder(`order1 ${e}`);
    }
  };

  return (
    <div className="all">
      <nav className="nav">
        <ul>
          <div className="nav__1">
            <li>
              <Link to="/home" className="link__home">
                <button
                  type="button"
                  onClick={() => handleHome()}
                  className="home"
                >
                  <ImHome />
                </button>
              </Link>
            </li>
            <li className="search">
              <SearchBar />
            </li>
            <li>
              <Link to="/recipe">
                <button className="create__home">Create New Recipe</button>
              </Link>
            </li>
          </div>
          <div className="filtros">
            <li className="orden__carta">
              <span>Order</span>
              <select onChange={(e) => handleFilterOrder(e)}>
                <option disabled selected>
                  Alphabetic
                </option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
              </select>
            </li>
            <li>
              <span>Order by </span>
              <select onChange={(e) => handleFilterByScore(e)}>
                <option disabled selected>
                  Score
                </option>
                <option value="asc">100-1</option>
                <option value="des">1-100</option>
              </select>
            </li>
            <li>
              <span>Diets</span>
              <select onChange={(e) => handleFilterRecipesByDiets(e)}>
                <option value="all">all</option>
                {allDiets &&
                  allDiets.map((e) => {
                    return (
                      <option value={e === "lacto vegetarian" ? "lacto" : e}>
                        {e}
                      </option>
                    );
                  })}
                {/*map de localhost3001/types? para mostrar en */}
              </select>
            </li>
          </div>
        </ul>
      </nav>
      <div className="cards">
        <div className="container">
          {allRecipes ===
          "No se encontro ninguna receta con el nombre solicitado!" ? (
            <div>
              <h1>Error 404</h1>
              <h5>No se a encontrado una receta que coincida con el nombre</h5>
            </div>
          ) : (
            currentRecipe &&
            currentRecipe.map((e) => (
              <Link to={"/home/" + e.id} className="link__home">
                <Card
                  title={e.title}
                  createdInDB={e.createdInDB ? e.createdInDB : false}
                  diets={e.diets ? e.diets : e.Diets}
                  image={e.image}
                  key={e.id}
                  spoonacularScore={e.spoonacularScore}
                />
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="paginado">
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      <div className="fondo__home">
        <img className="img__fondo" src={fondo} alt="" />
      </div>
    </div>
  );
}

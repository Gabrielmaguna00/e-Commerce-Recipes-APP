import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get("/recipes");
    console.log("esto viene del /recipes ", json);
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}
export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get("/types");
    let diets = await json.data.map((e) => e.name);
    return dispatch({
      type: "GET_DIETS",
      payload: diets,
    });
  };
}
export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/recipes?name=${name}`);
      return dispatch({
        type: "GET_RECIPES_NAME",
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: "GET_RECIPES_NAME",
        payload: "No se encontro ninguna receta con el nombre solicitado!",
      });
    }
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    let response = await axios.post(`/recipe`, payload);
    return response;
  };
}
export function getdetail(id) {
  return async function (dispatch) {
    const json = await axios.get(`/recipes/${id}`);
    if (json.hasOwnProperty("data")) {
      return dispatch({
        type: "GET_DETAIL_ID",
        payload: json.data,
      });
    } else {
      return dispatch({
        type: "GET_DETAIL_ID",
        payload: json,
      });
    }
  };
}
export function getHome() {
  return {
    type: "HOME",
  };
}
export function deleteRecipe(id) {
  return async function (dispatch) {
    const json = await axios.delete(`/delete/${id}`)
    getRecipes()
  };
}
export function reset() {
  return {
    type: "RESET",
  };
}
export function filterRecipesPerDiets(payload) {
  return {
    type: "FILTER_RECIPES_PER_DIETS",
    payload,
  };
}
export function filterByName(payload) {
  return {
    type: "FILTER_BY_NAME",
    payload,
  };
}
export function filterByScore(payload) {
  return {
    type: "FILTER_BY_SCORE",
    payload,
  };
}

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
  errores: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
        detail: [],
      };
    case "GET_RECIPES_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "GET_DETAIL_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_RECIPES_PER_DIETS":
      const dborapi = (e) => {
        if (e.createdInDB) {
          //en una variable
          return e.Diets.find((e) => e.name === action.payload);
        } else {
          return (
            e.diets.includes(action.payload) ||
            e.diets.find((e) => e.includes(action.payload))
          );
        }
      };
      const recipesFilter =
        action.payload === "all"
          ? state.allRecipes
          : state.allRecipes.filter((e) => dborapi(e));
      return {
        ...state,
        recipes: recipesFilter,
      };
    case "FILTER_BY_NAME":
      const order =
        action.payload === "asc"
          ? state.recipes.sort((a, b) =>
              a.title.toLowerCase() > b.title.toLowerCase()
                ? 1
                : b.title.toLowerCase() > a.title.toLowerCase()
                ? -1
                : 0
            )
          : state.recipes.sort((a, b) =>
              a.title.toLowerCase() > b.title.toLowerCase()
                ? -1
                : b.title.toLowerCase() > a.title.toLowerCase()
                ? 1
                : 0
            );
      return {
        ...state,
        recipes: order,
      };
    case "FILTER_BY_SCORE":
      const orden =
        action.payload === "des"
          ? state.recipes.sort((a, b) =>
              a.healthScore > b.healthScore
                ? 1
                : b.healthScore > a.healthScore
                ? -1
                : 0
            )
          : state.recipes.sort((a, b) =>
              a.healthScore > b.healthScore
                ? -1
                : b.healthScore > a.healthScore
                ? 1
                : 0
            );
      return {
        ...state,
        recipes: orden,
      };
    case "RESET":
      return {
        ...state,
        detail: [],
      };
    case "HOME":
      return {
        ...state,
        recipes: state.allRecipes,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;

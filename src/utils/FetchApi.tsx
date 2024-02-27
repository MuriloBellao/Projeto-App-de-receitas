export const fetchIngredient = async (ingredient: string) => {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    console.log('mealIngredient', endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.meals;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchName = async (name: string) => {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log('Data in fetchName:', data);
    return data.meals;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchLetter = async (letter: string) => {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.meals;
  } catch (error: any) {
    return error.message;
  }
};

export const searchIngredientDrink = async (ingredient: string) => {
  try {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.drinks;
  } catch (error: any) {
    return error.message;
  }
};

export const searchNameDrink = async (name:string) => {
  try {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.drinks;
  } catch (error: any) {
    return error.message;
  }
};

export const searchLetterDrink = async (latter: string) => {
  try {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${latter}`;
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.drinks;
  } catch (error: any) {
    return error.message;
  }
};

// Dois fetchs do requisito 19

export const fetchMeals = async () => {
  try {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const fetchDrinks = async () => {
  try {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const fetchListMeals = async () => {
  try {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.meals;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchListDrinks = async () => {
  try {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.drinks;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchFilterDrinks = async (category: string) => {
  try {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.drinks;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchFilterMeals = async (category: string) => {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    return data.meals;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchRecipesDetailsMeals = async (id: string | undefined) => {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.meals;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchRecipesDetailsDrinks = async (id: string | undefined) => {
  try {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    return data.drinks;
  } catch (error: any) {
    return error.message;
  }
};

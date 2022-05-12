import { $host } from './index'
import { getUniqueObjectsFromArray } from 'helpers/array-helpers'

const drinkToClientFormat = (data) => {
  const ingredients = []

  for (let key in data) {
    if (key.indexOf('strIngredient') === 0 && data[key] !== null && data[key] !== '') {
      ingredients.push(data[key])
    }
  }

  const drink = {
    id: data.idDrink,
    name: data.strDrink,
    img: data.strDrinkThumb,
    ingredients,
    instruction: data.strInstructions
  }

  return drink
}

const findDrinks = (data, idDrink) => {
  return data.find(item => item.idDrink == idDrink)
}

const getFilteredDrinks = (alcoholic, category, glass) => {
  let drinks = [...alcoholic]

  if (category && glass) {
    drinks.push(...category, ...glass)

    drinks = drinks
      .filter(({ idDrink }) => findDrinks(alcoholic, idDrink))
      .filter(({ idDrink }) => findDrinks(category, idDrink))
      .filter(({ idDrink }) => findDrinks(glass, idDrink))
  }

  if (category && !glass) {
    drinks.push(...category)

    drinks = drinks
      .filter(({ idDrink }) => findDrinks(alcoholic, idDrink))
      .filter(({ idDrink }) => findDrinks(category, idDrink))
  }

  if (glass && !category) {
    drinks.push(...glass)

    drinks = drinks
      .filter(({ idDrink }) => findDrinks(alcoholic, idDrink))
      .filter(({ idDrink }) => findDrinks(glass, idDrink))
  }

  drinks = drinks.filter(item => getUniqueObjectsFromArray(drinks, item.idDrink))

  return drinks.map(drinkToClientFormat)
}

export async function getRandomDrink() {
  const { data } = await $host.get(`random.php`)

  return drinkToClientFormat(data.drinks[0])
}

export async function getDrinks(alcoholic, category, glass) {
  const alcoholicData = await $host.get(`filter.php?a=${alcoholic}`)
  const categoryData = await $host.get(`filter.php?c=${category}`)
  const glassData = await $host.get(`filter.php?g=${glass}`)

  const alcoholicDrinks = alcoholicData.data.drinks
  const categoryDrinks = categoryData.data.drinks
  const glassDrinks = glassData.data.drinks

  if (!categoryDrinks && !glassDrinks) {
    return alcoholicDrinks.map(drinkToClientFormat)
  }

  return getFilteredDrinks(alcoholicDrinks, categoryDrinks, glassDrinks)
}

export async function getDrinkById(drinkId) {
  const { data } = await $host.get(`lookup.php?i=${drinkId}`)

  return drinkToClientFormat(data.drinks[0])
}









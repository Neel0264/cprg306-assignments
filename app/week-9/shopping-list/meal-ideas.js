"use client";

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals; 
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

async function fetchMealDetails(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals ? data.meals[0] : null; 
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [mealDetailsCache, setMealDetailsCache] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  async function loadMealIdeas() {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals || []);
      setExpandedMealId(null);
      setMealDetailsCache({});
    } else {
      setMeals([]);
      setExpandedMealId(null);
      setMealDetailsCache({});
    }
  }

  async function handleMealSelect(mealId) {
    setExpandedMealId(mealId);

    if (!mealDetailsCache[mealId]) {
      setLoadingDetails(true);
      const details = await fetchMealDetails(mealId);
      setMealDetailsCache((prevCache) => ({
        ...prevCache,
        [mealId]: details,
      }));
      setLoadingDetails(false);
    }
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  const renderIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure ? measure.trim() : ""}`);
      }
    }
    return ingredients.filter(Boolean);
  };

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-xl font-bold mb-2 p-1">Meal Ideas</h2>
      {ingredient ? (
        meals && meals.length > 0 ? (
          <ul>
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className="group p-1 mb-1 text-xs w-[300px] bg-gray-700  cursor-pointer
                           shadow-md border border-transparent
                           hover:bg-orange-700 hover:shadow-lg hover:border-orange-400
                           transition-all duration-200 ease-in-out"
                onClick={() => handleMealSelect(meal.idMeal)}
              >
                <h3 className="text-sm font-bold">{meal.strMeal}</h3>
                {expandedMealId === meal.idMeal && (
                  <div className="p-3 rounded-lg"> 
                    {loadingDetails && !mealDetailsCache[meal.idMeal] ? (
                      <p>Loading ingredients...</p>
                    ) : mealDetailsCache[meal.idMeal] ? (
                      <>
                        <h4 className="text-lg font-semibold mb-2">Ingredients:</h4>
                        <ul>
                          {renderIngredients(mealDetailsCache[meal.idMeal]).map((ing, index) => (
                            <li key={index} className="mb-2 text-xs group-hover:text-gray-200 transition-colors duration-200">
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p>No Meal ideas found for {ingredient}</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No meal ideas found for {ingredient}</p>
        )
      ) : (
        <p>Select an item to see meal ideas</p>
      )}
    </div>
  );
}
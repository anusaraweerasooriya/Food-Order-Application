import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-http-e4adf-default-rtdb.firebaseio.com/meals.json",
          {
            method: "GET",
          }
        );
        const responseData = await response.json();

        const loadedMeals = [];
        for (let key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        setMeals(loadedMeals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, []);

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

import { Suspense, Fragment } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import MealsSummary from "../components/Meals/MealsSummary";
import AvailableMeals from "../components/Meals/AvailableMeals";

function MealsPage() {
  const { meals: meals } = useLoaderData();

  return (
    <Fragment>
      <MealsSummary></MealsSummary>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={meals}>
          {(loadedMeals) => (
            <AvailableMeals meals={loadedMeals}></AvailableMeals>
          )}
        </Await>
      </Suspense>
    </Fragment>
  );
}

export default MealsPage;

async function loadMeals() {
    const response = await fetch('http://localhost:4000/meals/');

    if (!response.ok) {
      throw json(
        { message: 'Could not fetch meals.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData.meals;
    }
}

export function loader() {
  return defer({
    meals: loadMeals(),
  });
}

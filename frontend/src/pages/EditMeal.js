import { Suspense } from 'react';
import {
  useRouteLoaderData,
  useLoaderData,
  json,
  redirect,
  defer,
  Await
} from "react-router-dom";

import MealForm from "../components/Meals/MealItem/MealForm";
import {checkAuthLoader} from '../util/auth'

function EditEventPage() {
  const { meal } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={meal}>
          {(loadedMeal) => <MealForm method="patch" meal={loadedMeal} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EditEventPage;

async function loadMeal(id) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}meals/${id}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected meal." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.meal;
  }
}

export async function loader({ request, params }) {
  checkAuthLoader();
  const id = params.mealId;

  return defer({
    meal: await loadMeal(id),
  });
}

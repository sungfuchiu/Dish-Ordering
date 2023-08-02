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
  //   const response = await fetch('http://localhost:8080/events');

  //   if (!response.ok) {
  //     throw json(
  //       { message: 'Could not fetch events.' },
  //       {
  //         status: 500,
  //       }
  //     );
  //   } else {
  //     const resData = await response.json();
  //     return resData.events;
  //   }
  
  return [
    {
      id: "1",
      price: 10,
      name: "Handcrafted Pepperoni Duo",
      imageURL:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.cup-ncrips-pepperoni.6e70aa3c5f6fe7468963988ff4c84c87.1.jpg",
      description:
        'Our new light & airy everyday crust featuring super crispy "cup n crisp" pepperoni, and classic pepperoni.',
    },
    {
      id: "2",
      price: 20,
      name: "Handcrafted Smoky Tri-Cheese Blend",
      imageURL:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.tri-cheese-pizza.eee94f51ae94be4a8d19c55e5f3de381.1.jpg",
      description:
        "Our new light & airy everyday crust featuring the perfect combination of smoked cheddar, parm, and pizza mozzarella for cheese lovers",
    },
    {
      id: "3",
      price: 30,
      name: 'The Great "Beyond"',
      imageURL:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.the-great-beyond.76c7634f22629bc22d55ed0525beb267.1.jpg",
      description:
        "Beyond Meat Italian Sausage Crumble, hot peppers, Red Onion, and Pizza Mozzarella",
    },
    {
      id: "4",
      price: 40,
      name: "Hawaiian",
      imageURL:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.hawaiian.6c049fb1897c6f45f597dd1671fbd016.1.jpg",
      description: "Ham, pineapple and extra pizza mozzarella",
    },
    {
      id: "5",
      price: 40,
      name: "Hawaiian",
      imageURL:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.hawaiian.6c049fb1897c6f45f597dd1671fbd016.1.jpg",
      description: "Ham, pineapple and extra pizza mozzarella",
    },
  ];
}

export function loader() {
  return defer({
    meals: loadMeals(),
  });
}

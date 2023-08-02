import { useEffect, useState, useContext } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import CartContext from "../../store/cart-context";
import { type } from "@testing-library/user-event/dist/type";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = (props) => {
  const [meals, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const cartCnx = useContext(CartContext);
  const cartItemRemoveHandler = (id) => {
    cartCnx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCnx.addItem({ ...item, amount: 1 });
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(
  //       "https://react-http-fd79d-default-rtdb.firebaseio.com/Foods.json",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const responseData = await response.json();
  //     setMealsList(responseData || DUMMY_MEALS);
  //     setIsLoading(false);
  //   }
  //   fetchData().catch(e => {
  //     setHttpError(e.message);
  //     setIsLoading(false);
  //   });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <section className={classes.MealsLoading}>
  //       <h1>Lodaing...</h1>
  //     </section>
  //   );
  // }

  // if(httpError){
  //   return (
  //     <section className={classes.MealsError}>
  //       <p1>{httpError}</p1>
  //     </section>
  //   )
  // }

  const mealsList = props.meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      image={meal.imageURL}
      price={meal.price}
      onRemove={cartItemRemoveHandler.bind(null, meal.id)}
      onAdd={cartItemAddHandler.bind(null, meal)}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {/* {isLoading && <p>Page is loading.</p>}
        {!isLoading && <ul>{mealsList}</ul>} */}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

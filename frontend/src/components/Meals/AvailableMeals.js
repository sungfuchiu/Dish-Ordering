import { useContext } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import CartContext from "../../store/cart-context";
import { useSelector } from 'react-redux';

const AvailableMeals = (props) => {
  const cartCnx = useContext(CartContext);
  const queryText = useSelector((state) => state.query.queryText);
  const cartItemRemoveHandler = (id) => {
    cartCnx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCnx.addItem({ ...item, amount: 1 });
  };
  const mealsFiltered = props.meals.filter((meal) =>
    meal.name.toLowerCase().includes(queryText)
  );
  const mealsList = props.meals.map((meal) => {
    meal = { ...meal, id: meal._id };
    return (
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
    );
  });

  return (
    <section className={classes.meals}>
      {mealsFiltered.length !== 0 && <ul>{mealsList}</ul>}
      {mealsFiltered.length === 0 && (
        <h1 className={classes.SearchMessage}>No meal found.</h1>
      )}
    </section>
  );
};

export default AvailableMeals;

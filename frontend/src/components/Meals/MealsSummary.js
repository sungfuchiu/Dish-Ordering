import classes from './MealsSummary.module.css';
import mealsImage from "../../assets/meals.jpg";

const MealsSummary = () => {
  return (
    <>
    <div className={classes["main-image"]}>
      <img src={mealsImage} alt="A table full of delicious food!" />
    </div>
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
    </>
  );
};

export default MealsSummary;
import classes from './Introduction.module.css';
import mealsImage from "../../assets/meals.jpg";

const Introduction = () => {
  return (
    <>
    <div className={classes["main-image"]}>
      <img src={mealsImage} alt="A table full of delicious food!" />
    </div>
    <section className={classes.summary}>
      <h2>Ocean Breeze Seafood</h2>
      <p>
      Welcome to Ocean Breeze Seafood, where exquisite flavors of the sea await you. 
      Indulge in our carefully crafted dishes, from succulent shrimp to delicate crab. 
      Join us for an unforgettable culinary journey by the shore.
      </p>
    </section>
    </>
  );
};

export default Introduction;
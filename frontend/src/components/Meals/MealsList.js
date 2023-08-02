import { Link } from 'react-router-dom';

import classes from './MealsList.module.css';
import Card from './UI/Card';

function CuisinesList({events}) {

  return (
    <div className={classes.meals}>
        {events.map((meal) => (
          <Card key={meal.id} className={classes.item}>
            <Link to={`/events/${meal.id}`}>
              <img src={meal.image} alt={meal.title} />
              <div className={classes.content}>
                <h2>{meal.title}</h2>
                <time>{meal.date}</time>
              </div>
            </Link>
          </Card>
        ))}
    </div>
  );
}

export default CuisinesList;

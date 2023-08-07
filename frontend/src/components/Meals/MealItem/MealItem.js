import React, { useContext, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import Card from "../../UI/Card";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const token = useRouteLoaderData("root");
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const [shoppingBtnClasses, setShoppingBtnClasses] = useState(
    `${classes.button}`
  );
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  const item = cartCtx.items.find((i) => i.id === props.id);
  let amount = 0;
  if (item) {
    amount = item.amount;
  }

  const buttonBump = () => {
    setShoppingBtnClasses(`${classes.button} ${classes.bump}`);
    setTimeout(() => {
      props.onAdd();
      setShoppingBtnClasses(`${classes.button}`);
    }, 130);
  };
  return (
    <li key={props.id} className={`${classes.item} ${classes.meal}`}>
      <Card>
      <div className={classes.content}>
        <img className={classes.image} src={props.image} alt={props.name} width="200" height="200"/>
        <div className={classes.info}>
          <p className={classes.mealName}>{props.name}</p>
          <div className={classes.description}>{props.description}</div>
          <Link to={`/events/${props.id}`}></Link>
        </div>
      </div>
      <div className={classes.buttonBlock}>
        {amount === 0 && (
          <button className={shoppingBtnClasses} onClick={buttonBump}>
            <FaPlus className={classes.badge} />
          </button>
        )}
        {amount > 0 && (
          <>
            <button
              className={`${classes.button} ${classes["upper-button"]}`}
              onClick={props.onAdd}
            >
              <FaPlus className={classes.badge} />
            </button>
            <p className={classes.amount}>{amount}</p>
            <button
              className={`${classes.button} ${classes["lower-button"]}`}
              onClick={props.onRemove}
            >
              <FaMinus className={classes.badge} />
            </button>
          </>
        )}
        <div className={classes.price}>{price}</div>
      </div>
      {token && (
      <div>
        <Link to={`/meals/${props.id}/edit`}>
          <p>Edit</p>
        </Link>
      </div>
      )}
      </Card>
    </li>
  );
};

export default MealItem;

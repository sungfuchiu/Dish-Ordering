import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
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
      <div className={classes.content}>
        <img src={props.image} alt={props.name} />
        <div>
          <h2>{props.name}</h2>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
          <Link to={`/events/${props.id}`}></Link>
        </div>
      </div>
      <div>
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
      </div>
      <div>
        <Link to={`/meals/${props.id}/edit`}>
          <p>Edit</p>
        </Link>
      </div>
    </li>
  );
};

export default MealItem;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  const item = cartCtx.items.find(i => i.id === props.id);
  let amount = 0;
  if(item){
    amount = item.amount;
  }
  return (
    // <li className={classes.meal}>
    //   <div>
    //     <h3>{props.name}</h3>
    //     <div className={classes.description}>{props.description}</div>
    //     <div className={classes.price}>{price}</div>
    //   </div>
    //   <div>
    //     {/* <MealItemForm onAddToCart={addToCartHandler} /> */}
    //   </div>
    // </li>

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
        <MealItemForm onAddToCart={addToCartHandler} />
        <button onClick={props.onAdd}>
          <FaPlus />
        </button>
        <p>{amount}</p>
        <button onClick={props.onRemove}>
          <FaMinus />
        </button>
      </div>
    </li>
  );
};

export default MealItem;

import React, { useContext, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import Card from "../../UI/Card";

// import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useSelector } from 'react-redux';

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const token = useRouteLoaderData("root");
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const [shoppingBtnClasses, setShoppingBtnClasses] = useState(
    `${classes.button}`
  );
  const queryText = useSelector((state) => state.query.queryText);
  // const addToCartHandler = (amount) => {
  //   cartCtx.addItem({
  //     id: props.id,
  //     name: props.name,
  //     amount: amount,
  //     price: props.price,
  //   });
  // };

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

  const isVisible = props.name.toLowerCase().includes(queryText);
  // const isVisible = props.name.toLowerCase().includes(cartCtx.searchText);
  return (
    <li key={props.id} className={`${classes.item} ${classes.meal} ${!isVisible && classes.hide}`}>
      <Card>
        <div className={classes.content}>
          <img
            className={classes.image}
            src={props.image}
            alt={props.name}
            width="200"
            height="200"
          />
          <div className={classes.info}>
            <p className={classes.mealName}>{props.name}</p>
            <div className={classes.description}>{props.description}</div>
          </div>
        </div>
        <div className={classes.buttonBlock}>
          {!token && amount === 0 && (
            <button className={shoppingBtnClasses} onClick={buttonBump}>
              <FaPlus className={classes.badge} />
            </button>
          )}
          {!token && amount > 0 && (
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
        {token && (
            <Link className={classes.button} to={`/meals/${props.id}/edit`}>
              <FaEdit className={classes.badge} />
            </Link>
        )}
          <div className={classes.price}>{price}</div>
        </div>
      </Card>
    </li>
  );
};

export default MealItem;

import React, { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";

import { FaShoppingCart } from "react-icons/fa";
import classes from "./HeaderCartButton.module.css";

const CartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items, totalAmount } = cartCtx;

  const numberOfCartItem = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if(items.length === 0 ){
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span>
        <FaShoppingCart/>
      </span>
      <span>${totalAmount}</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default CartButton;

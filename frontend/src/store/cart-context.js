import React, { useState, useEffect } from "react";

const CartContext = React.createContext({
  items: [],
  orderList: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;

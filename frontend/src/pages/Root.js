import {
  Outlet,
  useNavigation,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import { useState } from "react";

import MainNavigation from "../components/Layout/MainNavigation";
import CartProvider from '../store/CartProvider'
import Cart from '../components/Cart/Cart'
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    if(token === 'EXPIRED'){
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDruation = getTokenDuration();
    console.log(tokenDruation);

    setTimeout(() => {
      console.log(tokenDruation);
      submit(null, { action: "/logout", method: "post" });
    }, tokenDruation);
  }, [token, submit]);
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <MainNavigation onShowCart={showCartHandler} />
      <main>
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default RootLayout;

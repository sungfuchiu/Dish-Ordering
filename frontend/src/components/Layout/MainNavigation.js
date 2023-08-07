import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Fragment } from "react";

function MainNavigation(props) {
  const token = useRouteLoaderData("root");

  return (
    <Fragment>
      <div className={classes.headerLine}>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Meals
              </NavLink>
            </li>
            {token && (
            <li>
              <NavLink
                to="/meals/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Meal
              </NavLink>
            </li>
            )}
            {!token && (
              <li>
                <NavLink
                  to="/login?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            )}
          </ul>
        </nav>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      </div>
    </Fragment>
  );
}

export default MainNavigation;

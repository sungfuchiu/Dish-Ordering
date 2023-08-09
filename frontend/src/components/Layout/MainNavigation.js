import { useRef } from "react";
import {
  NavLink,
  Form,
  useRouteLoaderData,
  useLocation,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import classes from "./MainNavigation.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Fragment } from "react";
import { queryActions } from "../../store/search";

function MainNavigation(props) {
  const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  const searchInputRef = useRef();
  let timer;
  const searchBarChangedHandler = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(queryActions.query(searchInputRef.current.value));
    }, 300);
  };
  const location = useLocation();
  const isInLoginPage = location.pathname === "/login";

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
              { !isInLoginPage && <li>
                <div>
                  <input
                    className={classes.searchbar}
                    onChange={searchBarChangedHandler}
                    ref={searchInputRef}
                    placeholder="search meals"
                  />
                </div>
              </li>}
            </ul>
          </nav>
          {!token && !isInLoginPage && <HeaderCartButton onClick={props.onShowCart} />}
        </header>
      </div>
    </Fragment>
  );
}

export default MainNavigation;

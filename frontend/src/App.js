import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import MealsPage from "./pages/Meals";
import EditMealPage, { loader as mealDetailLoader } from "./pages/EditMeal";
import NewMealPage from './pages/NewMeal'
import LoginPage, { action as authAction } from './pages/Login'
import {action as logoutAction} from './pages/Logout'
import { loader as mealsLoader } from "./pages/Meals";
import { action as manipulateMealAction } from "./components/Meals/MealItem/MealForm";
import {checkAuthLoader, tokenLoader} from './util/auth'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <MealsPage />,
        loader: mealsLoader,
      },
      {
        path: "meals/:mealId/edit",
        element: <EditMealPage />,
        loader: mealDetailLoader,
        action: manipulateMealAction,
      },
      {
        path: "meals/new",
        element: <NewMealPage />,
        action: manipulateMealAction,
        loader: checkAuthLoader,
      },
      {
        path: '/login',
        element: <LoginPage />,
        action: authAction,
      },
      {
        path: '/logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

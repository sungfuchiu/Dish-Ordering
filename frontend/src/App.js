import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import MealsPage from './pages/Meals';
import EditMealPage, {loader as mealDetailLoader} from './pages/EditMeal'
import {loader as mealsLoader} from './pages/Meals';
import { action as manipulateMealAction } from './components/Meals/MealItem/MealForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MealsPage />,
        loader: mealsLoader,
      },
      {
            path: 'meals/:mealId/edit',
            element: <EditMealPage />,
            loader: mealDetailLoader,
            action: manipulateMealAction,
            // loader: checkAuthLoader,
          }
      // {
      //   path: 'meals/:mealId',
      //   id: 'meal-detail',
      //   loader: mealDetailLoader,
      //   children: [
      //     {
      //       index: true,
      //       element: <MealDetailPage />,
      //       action: deleteMealAction,
      //     },
      //     {
      //       path: 'edit',
      //       element: <EditMealPage />,
      //       action: manipulateMealAction,
      //       loader: checkAuthLoader,
      //     },
      //   ],
      // },
      // {
      //   path: 'new',
      //   element: <NewMealPage />,
      //   action: manipulateMealAction,
      //   loader: checkAuthLoader,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

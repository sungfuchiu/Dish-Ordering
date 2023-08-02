import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import MealsPage from './pages/Meals'
import {loader as mealsLoader} from './pages/Meals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MealsPage />,
        loader: mealsLoader,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as loaderOrder } from './features/order/Order';
import AppLayout from './ui/AppLayout';

//New way of defining Routes in React if we are going to interact with an API.
//If we wouldn't be implementing the API fetching with React Router we could use the regular declartion of routes.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    //If we want children routes we just pass a children property with an array of routes again
    children: [
      { path: '/', element: <Home /> },
      //New Router API fetching: 2nd Connecting the loader with the PAGE
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        //We specify the action (to connect it to the route). Whenever a Form is submitted in this Route, it will trigger the action function
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: loaderOrder,
        errorElement: <Error />,
      },
    ],
  },
]);

const App = () => {
  //We import the RouterProvider and we pass the router as the router prop
  return <RouterProvider router={router} />;
};

export default App;

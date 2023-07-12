import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';

//New way of defining Routes in React if we are going to interact with an API.
//If we wouldn't be implementing the API fetching with React Router we could use the regular declartion of routes.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    //If we want children routes we just pass a children property with an array of routes again
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu /> },
      { path: '/cart', element: <Cart /> },
      { path: '/order/new', element: <CreateOrder /> },
      { path: '/order/:orderId', element: <Order /> },
    ],
  },
]);

const App = () => {
  //We import the RouterProvider and we pass the router as the router prop
  return <RouterProvider router={router} />;
};

export default App;

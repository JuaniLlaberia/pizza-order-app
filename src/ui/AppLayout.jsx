import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        {/* The outlet will render the current route */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
};

export default AppLayout;

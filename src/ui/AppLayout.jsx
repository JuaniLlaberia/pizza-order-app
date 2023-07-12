import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

const AppLayout = () => {
  //We can use this to know if there is data bein fetch in the app (basically if its loading)
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className='layout'>
      {isLoading && <Loader />}
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

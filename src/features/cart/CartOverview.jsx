import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  const cartTotalItems = useSelector(getTotalCartQuantity);
  const cartTotalPrice = useSelector(getTotalCartPrice);

  if (cartTotalItems === 0) return null;

  return (
    <div
      className='flex items-center justify-between bg-stone-800 text-sm text-stone-200 uppercase px-4 py-4 
      sm:px-6 md:text-base xl:px-16'
    >
      <p
        className='text-stone-300 font-semibold space-x-3
        sm:space-x-6 '
      >
        <span>
          {cartTotalItems} {cartTotalItems === 1 ? 'pizza' : 'pizzas'}
        </span>
        <span>{formatCurrency(cartTotalPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

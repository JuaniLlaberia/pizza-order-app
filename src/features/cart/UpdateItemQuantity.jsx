import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increseItemQuantity } from './cartSlice';

const UpdateItemQuantity = ({ pizzaId, crrQuantity }) => {
  const dispatch = useDispatch();

  return (
    <div className='flex gap-2 items-center md:gap-3'>
      <Button
        type='round'
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className='text-sm font-medium'>{crrQuantity}</span>
      <Button
        type='round'
        onClick={() => dispatch(increseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;

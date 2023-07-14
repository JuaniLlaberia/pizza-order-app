import { useState } from 'react';
import { Form } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { createOrder } from '../../services/apiRestaurant';
import { redirect, useNavigation, useActionData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(state => state.user);
  const isLoadingAdress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const dispatch = useDispatch();

  //We have access to the error in case there is one because the component is connected to the action
  const formError = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let's go!</h2>
      {/* We are going to use the custom Form component from react router dom, with the method of
      POST in order to write in the API */}
      <Form method='POST'>
        <div className='mb-5 flex gap-2 flex-col md:flex-row md:items-center'>
          <label className='md:basis-40'>First Name</label>
          <input
            className='input grow'
            defaultValue={username}
            type='text'
            name='customer'
            required
          />
        </div>

        <div className='mb-5 flex gap-2 flex-col md:flex-row md:items-center'>
          <label className='md:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formError?.phone && (
              <p className='text-xs mt-2 text-red-600 bg-red-200 p-2 rounded-md'>
                {formError.phone}
              </p>
            )}
          </div>
        </div>
        <div className='relative mb-5 flex gap-2 flex-col md:flex-row md:items-center'>
          <label className='md:basis-40'>Address</label>
          <div className='grow'>
            <input
              disabled={isLoadingAdress}
              defaultValue={address}
              className='input w-full'
              type='text'
              name='address'
              required
            />
            {addressStatus === 'error' && (
              <p className='text-xs mt-2 text-red-600 bg-red-200 p-2 rounded-md'>
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-[2.5px] bottom-[3px] z-30'>
              <Button
                disabled={isLoadingAdress}
                type='small'
                onClick={e => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:ring-opacity-30'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority? (Extra: 20%)
          </label>
        </div>

        <div>
          {/* Small trick to see the cart and the position when we submit */}
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={JSON.stringify(
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            )}
          />
          <Button disabled={isSubmitting || isLoadingAdress} type='primary'>
            {isSubmitting
              ? 'Submitting order...'
              : `Order now (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//We need to create our action
export const action = async ({ request }) => {
  //We 'catch' the request
  const formData = await request.formData();

  //We transform the request into data that we can use
  const data = Object.fromEntries(formData);

  //We create the order object that will be send to the API
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  //Creating errors depending on the situation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please give us a valid phone number.';

  if (Object.keys(errors).length > 0) return errors;

  //We create a new order if everything is OK
  const newOrder = await createOrder(order);

  //The order is not a component so we cant access the useDispatch, with this 'trick'
  //of importing the store, we are able to access that store and dispatch the action we needed
  //We should not use this unless its 100% neccessary
  store.dispatch(clearCart());

  //Now we want to redirect to the order/id page but we cant use the navigate because this is not a hook or component
  //We will use the redirect (React router provides it) -> It creates a response
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;

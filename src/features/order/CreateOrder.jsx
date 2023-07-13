import { useState } from 'react';
import { Form } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { redirect, useNavigation, useActionData } from 'react-router-dom';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  //We have access to the error in case there is one because the component is connected to the action
  const formError = useActionData();

  const cart = fakeCart;

  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let's go!</h2>
      {/* We are going to use the custom Form component from react router dom, with the method of
      POST in order to write in the API */}
      <Form method='POST'>
        <div className='mb-5 flex gap-2 flex-col md:flex-row md:items-center'>
          <label className='md:basis-40'>First Name</label>
          <input className='input grow' type='text' name='customer' required />
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

        <div className='mb-5 flex gap-2 flex-col md:flex-row md:items-center'>
          <label className='md:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              required
            />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:ring-opacity-30'
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* Small trick to see the cart */}
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting ? 'Submitting order...' : 'Order now'}
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
    priority: data.priority === 'on',
  };

  //Creating errors depending on the situation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please give us a valid phone number.';

  if (Object.keys(errors).length > 0) return errors;

  //We create a new order if everything is OK
  const newOrder = await createOrder(order);

  //Now we want to redirect to the order/id page but we cant use the navigate because this is not a hook or component
  //We will use the redirect (React router provides it) -> It creates a response
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;

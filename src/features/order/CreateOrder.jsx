import { useState } from 'react';
import { Form } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { redirect, useNavigation, useActionData } from 'react-router-dom';

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
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/* We are going to use the custom Form component from react router dom, with the method of
      POST in order to write in the API */}
      <Form method='POST'>
        <div>
          <label>First Name</label>
          <input type='text' name='customer' required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type='tel' name='phone' required />
          </div>
          {formError?.phone && <p>{formError.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type='text' name='address' required />
          </div>
        </div>

        <div>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want to yo give your order priority?</label>
        </div>

        <div>
          {/* Small trick to see the cart */}
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
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

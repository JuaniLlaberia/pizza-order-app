import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from '../menu/MenuItem';

function Menu() {
  //New Router API fetching: 3rd we get the data in the Page using a hook
  const menu = useLoaderData();
  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu?.map(pizza => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

//New Router API fetching: 1st We create the loader function where we interact with the API
export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;

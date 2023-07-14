import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector(state => state.user.username);
  return (
    <div className='my-10 sm:my-16 text-center px-4 '>
      <h1 className='text-xl font-semibold mb-8 p-2 md:text-3xl xl:text-4xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to='/Menu' type='primary'>
          Resume order, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;

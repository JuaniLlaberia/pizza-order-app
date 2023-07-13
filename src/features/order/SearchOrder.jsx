import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='border-none px-4 py-2 text-sm outline-none rounded-full bg-yellow-200
        placeholder:text-stone-400 placeholder:text-sm w-28 transition-all duration-300 sm:focus:w-72 sm:w-48 focus:outline-none
        focus:ring-1 focus:ring-opacity-50 focus:ring-yellow-500 sm:text-base sm:placeholder:text-base'
        placeholder='Search order #'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;

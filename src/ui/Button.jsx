import { Link } from 'react-router-dom';

const Button = ({ children, disabled, to, type, onClick }) => {
  const base = `bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block
  tracking-wide rounded-full focus:outline-none focus:ring focus:ring-offset-2
  focus:ring-yellow-300 hover:bg-yellow-300 transition-colors duration-300
  disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500`;

  const styles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    small: base + ' text-xs px-4 py-2 md:px-5 md:py-2.5',
    secondary: `border-2 border-stone-300 uppercase px-4 py-2.5 font-semibold text-stone-400 inline-block
    tracking-wide rounded-full focus:outline-none focus:ring focus:ring-offset-2
    focus:ring-stone-200 hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300
    disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 sm:px-6 sm:py-3.5`,
    round: base + ' text-sm px-2.5 py-1 md:px-3.5 md:py-2',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;

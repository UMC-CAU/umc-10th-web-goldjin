// src/components/navbar.tsx
import { Link, NavLink, type NavLinkRenderProps } from 'react-router-dom';

const Navbar = () => {

  const navClass = ({isActive}: NavLinkRenderProps) => isActive
    ? "text-green-600 font-bold"
    : "text-black font-bold";

  return (
    <nav className='flex w-100 mx-10 my-5 justify-between'>
      <NavLink to="/" className={navClass}>Home</NavLink>
      <NavLink to="/popular" className={navClass}>인기</NavLink>
      <NavLink to="/now_playing" className={navClass}>상영 중</NavLink>
      <NavLink to="/top_rated" className={navClass}>평점 높은</NavLink>
      <NavLink to="/upcoming" className={navClass}>개봉 예정</NavLink>
    </nav>
  );
};

export default Navbar;
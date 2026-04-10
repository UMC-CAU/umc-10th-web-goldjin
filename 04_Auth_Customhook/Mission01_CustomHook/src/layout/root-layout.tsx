// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
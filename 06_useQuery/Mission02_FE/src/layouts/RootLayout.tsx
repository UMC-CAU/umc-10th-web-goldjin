import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { useEffect, useState } from 'react';


const RootLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const toggleSidebar = () => {

    setIsSidebarOpen((prev) => !prev);

  }



  useEffect(() => {

  const handleResize = () => {

    setIsMobile(window.innerWidth < 1024);

  };



  if (isMobile) {

    setIsSidebarOpen(false);

  }

  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);

  }, [isMobile]);



  return (

    <div className='min-h-screen flex flex-col'>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isMobile || !isSidebarOpen ? 'relative' : 'flex'}`}>
        <aside className={`
          left-0 z-50 w-64 bg-[#151515] transition-transform duration-300 transform
          ${isMobile || !isSidebarOpen ? 'fixed' : 'relative'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar toggleSidebar={toggleSidebar} />
        </aside>
        <div className='flex justify-center w-full p-4'>
          <Outlet />
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={toggleSidebar}
            />
          )}
        </div>  
      </div>
    </div>

  );

};


export default RootLayout;
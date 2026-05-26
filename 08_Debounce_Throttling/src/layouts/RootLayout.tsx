import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { useEffect, useState } from 'react';
import { useSidebar } from '../hooks/useSidebar';



const RootLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const {closeSidebar, toggleSidebar, isSidebarOpen} = useSidebar();

  useEffect(() => {
    if (!isSidebarOpen) return;

    // 1. 현재 브라우저의 원래 overflow 스타일을 기억해둡니다.
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // 2. body의 스크롤을 막습니다.
    document.body.style.overflow = "hidden";

    // 3. 컴포넌트가 닫히거나 언마운트될 때 원래 스타일로 복구합니다. (클린업 함수)
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isSidebarOpen]);



  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };



  if (isMobile) {
    closeSidebar();
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
              onClick={closeSidebar}
            />
          )}
        </div>  
      </div>
    </div>

  );

};


export default RootLayout;
import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    if (!accessToken) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
        <Navbar />
        <div className='flex justify-center'>
            <Outlet />
        </div>
        </>
    );
};

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RootLayout from './RootLayout';

export const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    if (!accessToken) {
        window.alert("로그인이 필요한 페이지입니다.");
        return <Navigate to="/login" replace />
    }

    return (
        <RootLayout />
    );
};

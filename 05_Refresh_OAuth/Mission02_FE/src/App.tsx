import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import { MyPage } from "./pages/MyPage"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedLayout } from "./layouts/ProtectedLayout"
import path from "path"
import { GoogleLoginRedirectPage } from "./pages/GoogleLoginRedirectPage"

const publicRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <>오류가 발생했습니다.</>,
    children: [
      {index: true, element: ''},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />},
      {path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage />}
    ],
  }
]

const privateRoutes = [{
  path: '/',
  element: <ProtectedLayout />,
  errorElement: <>오류가 발생했습니다.</>,
  children: [
    {path: 'my', element: <MyPage />}
  ],
}]

const router = createBrowserRouter([...publicRoutes, ...privateRoutes])

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
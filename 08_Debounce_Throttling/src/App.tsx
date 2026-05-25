import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import { MyPage } from "./pages/MyPage"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedLayout } from "./layouts/ProtectedLayout"
import { GoogleLoginRedirectPage } from "./pages/GoogleLoginRedirectPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import HomePage from "./pages/HomePage"
import LpDetailPage from "./pages/LpDetailPage"
import { CommentsPage } from "./pages/CommentsPage"
import { SearchProvider } from "./contexts/searchContext"

const publicRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <>오류가 발생했습니다.</>,
    children: [
      {index: true, element: <HomePage />},
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
    {path: 'my', element: <MyPage />},
    {path: 'lp/:lpid', element: <LpDetailPage />},
    {path: 'lp/:lpid/comments', element: <CommentsPage />}
  ],
}]

const router = createBrowserRouter([...publicRoutes, ...privateRoutes])
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </SearchProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
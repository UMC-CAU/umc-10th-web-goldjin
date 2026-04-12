import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <>오류가 발생했습니다.</>,
    children: [
      {index: true, element: ''},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />}
    ],
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
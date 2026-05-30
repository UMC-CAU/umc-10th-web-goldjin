import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShoppingCartPage } from "./pages/shoppingCartPage";
import Layout from "./layout/Layout";


const app = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ShoppingCartPage />
        }
      ],
      errorElement: <>오류가 발생했습니다.</>
    }  
  ]);


  return (
      <RouterProvider router={router} />
  )
}

export default app;
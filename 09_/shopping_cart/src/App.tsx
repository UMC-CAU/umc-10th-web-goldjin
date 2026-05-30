import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShoppingCartPage } from "./pages/shoppingCartPage";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import store from "./redux/store";

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
    // redux provider
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default app;
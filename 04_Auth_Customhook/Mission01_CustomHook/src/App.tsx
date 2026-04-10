import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import ListPage from './pages/listPage';
import MovieDetail from './pages/moviePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <></>,},
      { path: "popular", element: <ListPage type="popular"/>,},
      { path: "now_playing", element: <ListPage type="now_playing"/>,},
      { path: "top_rated", element: <ListPage type="top_rated"/>,},
      { path: "upcoming", element: <ListPage type="upcoming"/>,},
    ],
  },

  {
    path: '/movies/:movieId',
    element: <MovieDetail />,
    errorElement: <NotFound />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
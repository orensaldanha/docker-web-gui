import './App.css';

import Containers from './components/Containers';
import Container from './components/Container';
import Images from './components/Images';
import Image from './components/Image';
import Root from './components/Root';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/containers",
        element: <Containers />,
      },
      {
        path: "/containers/:containerName",
        element: <Container />
      }, 
      {
        path: "/images",
        element: <Images />,
      }, 
      {
        path: "/images/:imageId",
        element: <Image />,
      }
    ],
  },
]);

const App = () => {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

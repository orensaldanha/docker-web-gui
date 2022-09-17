import './App.css';

import Containers from './components/Containers';
import Container from './components/Container';
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

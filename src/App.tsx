import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootView from './views/Root';
import LoginView from './views/LogIn';
import CreateLinkView from './views/CreateLink';
import ResidentView from './views/Resident';
import ErrorView from './views/NotFound';
import InstructionsView from './views/Instructions';

import routes from './utils/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    errorElement: <ErrorView />,
    id: 'root',
    children: [
      {
        path: routes.admin.logIn,
        element: <LoginView />,
      },
      {
        path: routes.admin.createLink,
        element: <CreateLinkView />,
      },
      {
        path: routes.resident.list,
        element: <ResidentView />,
      },
      {
        path: routes.instructions.root,
        element: <InstructionsView />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

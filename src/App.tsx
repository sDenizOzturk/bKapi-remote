import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootView from './views/Root';
import LoginView from './views/LogIn';
import CreateLinkView from './views/Links';
import RegisterView from './views/Register';
import ListHouseholdsView from './views/Households';
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
        path: routes.link.listLinks,
        element: <CreateLinkView />,
      },
      {
        path: routes.link.temporary,
        element: <RegisterView userType="temporary" />,
      },
      {
        path: routes.link.permanent,
        element: <RegisterView userType="permanent" />,
      },
      {
        path: routes.household.list,
        element: <ListHouseholdsView />,
      },
      {
        path: routes.household.addUpdate,
        element: <RegisterView userType="admin" />,
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

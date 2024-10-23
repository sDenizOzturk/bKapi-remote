import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootView from './views/Root';
import LoginView from './views/LogIn';
import CreateLinkView from './views/Links';
import RegisterView from './views/Register';
import ListHouseholdsView from './views/Households';
import RecordsView from './views/Records';
import ErrorView from './views/NotFound';
import InstructionsView from './views/Instructions';

import routes from './utils/routes';
import IndexView from './views/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexView />,
  },
  {
    path: '/:target/',
    element: <RootView />,
    errorElement: <ErrorView />,
    id: 'root',
    children: [
      {
        path: routes.auth,
        element: <LoginView />,
      },
      {
        path: routes.listLinks,
        element: <CreateLinkView />,
      },
      {
        path: routes.temporaryLinks,
        element: <RegisterView userType="temporary" />,
      },
      {
        path: routes.permanentLinks,
        element: <RegisterView userType="permanent" />,
      },
      {
        path: routes.listHouseholds,
        element: <ListHouseholdsView />,
      },
      {
        path: routes.addUpdateHouseHold,
        element: <RegisterView userType="admin" />,
      },
      {
        path: routes.records,
        element: <RecordsView />,
      },
      {
        path: routes.instructions,
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

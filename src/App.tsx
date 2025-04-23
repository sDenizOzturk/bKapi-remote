import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import RootView from "./views/Root";
import LoginView from "./views/LogIn";
import ListHVehicleInsideView from "./views/VehicleInside";
import RegisterView from "./views/Register";
import ListHouseholdsView from "./views/Households";
import RecordsView from "./views/Records";
import ErrorView from "./views/NotFound";

import routes from "./utils/routes";
import IndexView from "./views/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexView />,
  },
  {
    path: "/:target/",
    element: <RootView />,
    errorElement: <ErrorView />,
    id: "root",
    children: [
      {
        path: routes.auth,
        element: <LoginView />,
      },
      {
        path: routes.listVehiclesInside,
        element: <ListHVehicleInsideView />,
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
        path: "*",
        element: <Navigate to={"/"} replace />,
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

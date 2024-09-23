import { createBrowserRouter } from "react-router-dom";
import TaskioDashboard from "../layout/TaskioDashboard";
import SignUpPage from "../auth/SignUpPage";
import SignInPage from "../auth/SignInPage";
import Info from "../components/Info";
import PrivateRoute from "./PrivateRoute";
import TaskOverviewPage from "../pages/TaskOverviewPage";
import StarredTaskPage from "../pages/StarredTaskPage";
import TrashedTaskPage from "../pages/TrashedTaskPage";

export const RouterConfig = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <TaskioDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <TaskOverviewPage />,
      },
      {
        index: true,
        element: <StarredTaskPage />,
        path: "/starred-task",
      },
      {
        index: true,
        element: <TrashedTaskPage />,
        path: "/trashed-task",
      },
    ],
  },
  {
    path: "/sign-up-page",
    element: <SignUpPage />,
  },
  {
    path: `/info-page/:id`,
    element: <Info />,
  },
  {
    path: "/sign-in-page",
    element: <SignInPage />,
  },
  {
    path: ":token/verify-account",
    element: <SignInPage />,
  },
]);

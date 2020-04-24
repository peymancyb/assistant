import Login from "./Login";
import Wizard from "./Wizard";
import Dashboard from "./Dashboard";
import CreateWorkspace from "./CreateWorkspace";

export enum Routes {
  LOGIN = "/login",
  WIZARD = "/wizard",
  DASHBOARD = "/dashboard",
  CREATE_WORKSPACE = "/create-workspace",
}

const ApplicationRoutes = [
  {
    route: Routes.LOGIN,
    Component: Login,
    isPrivate: false,
    exact: false,
  },
  {
    route: Routes.WIZARD,
    Component: Wizard,
    isPrivate: false,
    exact: true,
  },
  {
    route: Routes.DASHBOARD,
    Component: Dashboard,
    isPrivate: true,
    exact: true,
  },
  {
    route: Routes.CREATE_WORKSPACE,
    Component: CreateWorkspace,
    isPrivate: true,
    exact: true,
  },
];

export default ApplicationRoutes;

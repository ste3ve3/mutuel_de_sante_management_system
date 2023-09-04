
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
import Shop from "examples/Icons/Shop";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';  

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Underprivileged",
    key: "underprivileged",
    route: "/underprivileged",
    icon: <PeopleAltIcon size="12px" />,
    component: <Tables />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Sponsors",
    key: "sponsors",
    route: "/sponsors",
    icon: <VolunteerActivismIcon size="12px" />,
    component: <Billing />,
    noCollapse: true,
    protected: true,
  },
  {
    route: "/login",
    component: <SignIn />,
  },
];

export default routes;

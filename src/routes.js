
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "layouts/authentication/sign-out";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
    name: "Users",
    key: "users",
    route: "/users",
    icon: <PeopleAltIcon size="12px" />,
    component: <Tables />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Trainings",
    key: "trainings",
    route: "/trainings",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    route: "/courses",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
    protected: true,
  }, 
  {
    route: "/login",
    component: <SignUp />,
  },
];

export default routes;

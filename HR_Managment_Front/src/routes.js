import Login from "./components/Login/Login.js";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js";
import ResetPassword from "./components/ResetPassword/ResetPassword.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Users from "./components/Users/Users.js";
import Error404 from "./components/Shared/Error404/Error404.js";
import Rent from "./components/Rent/Rent.js";
import Register from "./components/Register/Register.js";
import Leave from "./components/Leave/Leave.js";
import Task from "./components/Task/Task.js";
import Employee from "./components/Employee/Employee.js";
import EditProfile from "./components/EditProfile/EditProfile.js";
import Holiday from "./components/Holiday/Holiday.js";
import PaySlip from "./components/PaySlip/PaySlip.js";
import ViewPaySlip from "./components/ViewPaySlip/ViewPaySlip.js";
import EmployeeKYC from "./components/EmployeeKYC/EmployeeKYC.js";
import TimeSheet from "./components/TimeSheet/TimeSheet.js";
import HiringDetails from "./components/HiringDetails/HiringDetails.js";
import Expenses from "./components/Expenses/Expenses.js";
import Announcement from "./components/Announcement/Announcement.js";
import Attendance from "./components/Attendance/Attendance.js";
import OverTime from "./components/OverTime/OverTime.js";
import AdminRegister from "./components/AdminRegister/AdminRegister.js";
import AddEmployee from "./components/AddEmployee/AddEmployee.js";

var dashRoutes = [
  /** Add all authentication routing (not required session) here */
  {
    path: "/",
    name: "Login",
    component: Login,
    icon: "",
    invisible: false,
    isSidebar: false,
    meta: {
      title: "Login",
    },
    isPreventedRoute: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    icon: "",
    invisible: false,
    isSidebar: false,
    meta: {
      title: "Login",
    },
    isPreventedRoute: true,
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Register,
  //   icon: "",
  //   invisible: false,
  //   meta: {
  //     title: "Register",
  //   },
  //   isPreventedRoute: true,
  // },
  {
    path: "/register",
    name: "AdminRegister",
    component: AdminRegister,
    icon: "",
    invisible: false,
    meta: {
      title: "AdminRegister",
    },
    isPreventedRoute: true,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    icon: "",
    invisible: false,
    isSidebar: false,
    meta: {
      title: "Forgot Password",
    },
    isPreventedRoute: true,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    icon: "",
    invisible: false,
    isSidebar: false,
    meta: {
      title: "Reset Password",
    },
    isPreventedRoute: true,
  },
  {
    path: "/404Error",
    name: "Error404",
    component: Error404,
    icon: "",
    invisible: false,
    isSidebar: false,
    meta: {
      title: "Page not found",
    },
    isShared: true,
  },

  /** Add all protected routing (requires session) here */
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Dashboard",
    },
    isPreventedRoute: false,
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "EditProfile",
    },
    isPreventedRoute: false,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Users",
    },
    isPreventedRoute: false,
  },
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Employee",
    },
    isPreventedRoute: false,
  },
  {
    path: "/add-employee",
    name: "AddEmployee",
    component: AddEmployee,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "AddEmployee",
    },
    isPreventedRoute: false,
  },
  {
    path: "/employee-kyc",
    name: "EmployeeKYC",
    component: EmployeeKYC,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "EmployeeKYC",
    },
    isPreventedRoute: false,
  },
  {
    path: "/time-sheet",
    name: "TimeSheet",
    component: TimeSheet,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "TimeSheet",
    },
    isPreventedRoute: false,
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Task",
    },
    isPreventedRoute: false,
  },
  {
    path: "/leave",
    name: "Leave",
    component: Leave,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Leave",
    },
    isPreventedRoute: false,
  },
  {
    path: "/announcement",
    name: "Announcement",
    component: Announcement,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Announcement",
    },
    isPreventedRoute: false,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Attendance",
    },
    isPreventedRoute: false,
  },
  {
    path: "/over-time",
    name: "OverTime",
    component: OverTime,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "OverTime",
    },
    isPreventedRoute: false,
  },
  {
    path: "/holiday",
    name: "Holiday",
    component: Holiday,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Holiday",
    },
    isPreventedRoute: false,
  },
  {
    path: "/hiring-details",
    name: "HiringDetails",
    component: HiringDetails,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "HiringDetails",
    },
    isPreventedRoute: false,
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Expenses",
    },
    isPreventedRoute: false,
  },
  {
    path: "/pay-slip",
    name: "PaySlip",
    component: PaySlip,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "PaySlip",
    },
    isPreventedRoute: false,
  },
  {
    path: "/view-pay-slip",
    name: "ViewPaySlip",
    component: ViewPaySlip,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "ViewPaySlip",
    },
    isPreventedRoute: false,
  },
  {
    path: "/Rent",
    name: "Rent",
    component: Rent,
    icon: "",
    invisible: false,
    isSidebar: true,
    meta: {
      title: "Rent",
    },
    isPreventedRoute: false,
  },
];

export default dashRoutes;

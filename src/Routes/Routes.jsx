import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllTests from "../pages/AllTests/AllTests";
import TestDetails from "../pages/TestDetails/TestDetails";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/DashBoard/User/Profile/Profile";
import Appointments from "../pages/DashBoard/User/Appointments/Appointments";
import TestResults from "../pages/DashBoard/User/TestResults/TestResults";
import AllUsers from "../pages/DashBoard/Admin/AllUsers/AllUsers";
import Reservation from "../pages/DashBoard/Admin/Reservation/Reservation";
import AllTestManagement from "../pages/DashBoard/Admin/AllTestsManagement.jsx/AllTestManagement";
import AddTest from "../pages/DashBoard/Admin/AddTest/AddTest";
import AllBanners from "../pages/DashBoard/Admin/AllBanners/AllBanners";
import AddBanner from "../pages/DashBoard/Admin/AddBanner/AddBanner";
import UpdateTest from "../pages/DashBoard/Admin/UpdateTest/UpdateTest";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import Recommendation from "../pages/DashBoard/Admin/Recommendation/Recommendation";
import UpdateUser from "../pages/DashBoard/User/UpdateUser/UpdateUser";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allTests",
        element: <AllTests></AllTests>,
      },
      {
        path: "/tests/:id",
        element: <PrivateRoutes><TestDetails></TestDetails></PrivateRoutes>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      // user routes
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "appointments",
        element: <Appointments></Appointments>,
      },
      {
        path: "testResult",
        element: <TestResults></TestResults>,
      },
      {
        path: 'updateUser/:id',
        element:<UpdateUser></UpdateUser>,
        loader: ({params})=> fetch(`https://dcms-server.vercel.app/users/update/${params.id}`)

      },

      // admin routes
      {
        path: "allUsers",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
      },
      {
        path: "reservation",
        element: <AdminRoute><Reservation></Reservation></AdminRoute>,
      },
      {
        path: "allTestsManagement",
        element: <AdminRoute><AllTestManagement></AllTestManagement></AdminRoute>,
      },
      {
        path: "addTest",
        element: <AdminRoute><AddTest></AddTest></AdminRoute>,
      },
      {
        path: "allBanners",
        element: <AdminRoute><AllBanners></AllBanners></AdminRoute>,
      },
      {
        path: "addBanner",
        element: <AdminRoute><AddBanner></AddBanner></AdminRoute>,
      },
      {
        path: "recommendation",
        element: <AdminRoute><Recommendation></Recommendation></AdminRoute>,
      },
      {
        path: 'updateTest/:id',
        element:<AdminRoute><UpdateTest></UpdateTest></AdminRoute>,
        loader: ({params})=> fetch(`https://dcms-server.vercel.app/test/${params.id}`)

      }
    ]
  }
]);
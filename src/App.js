import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/Pages/admin/Login";
import Dashboard from "./components/Pages/admin/Dashboard";
import Listing from "./components/Pages/admin/Listing";
import ProductSearch from "./components/Pages/admin/ProductSearch";
import Registration from "./components/Pages/web/Registration";
import Error404 from "./components/common/Eroor404";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Layout/ProtectedRoutes";
import PublicRoute from "./components/Layout/PublicRoutes";
import Profile from "./components/Pages/admin/Profile";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Public Route */}
        <Route path="/*" element={<Error404 />} />

        <Route
          path="/"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/*" element={<Error404 />} />
            <Route path="/Dashboard/Dashboard" element={<Dashboard />} />
            <Route path="/Dashboard/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

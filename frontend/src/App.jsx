import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import Suggestion from "./pages/Suggestion";
import Complaints from "./pages/Complaints";

import Tiffin from "./pages/Tiffin";
import Laundry from "./pages/Laundry";
import RoomCleaning from "./pages/RoomCleaning";
import Payments from "./pages/Payments";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminPayments from "./pages/AdminPayments";
import AdminComplaints from "./pages/AdminComplaints";
import AdminLayout from "./components/AdminLayout";
import AdminUsers from "./pages/AdminUsers";




// STUDENT PROTECTED ROUTE
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// ADMIN PROTECTED ROUTE
function AdminPrivateRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin-login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
<Route
  element={
    <AdminPrivateRoute>
      <AdminLayout />
    </AdminPrivateRoute>
  }
>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/requests" element={<AdminRequests />} />
  <Route path="/admin/payments" element={<AdminPayments />} />
  <Route path="/admin/complaints" element={<AdminComplaints />} />
  <Route path="/admin/users" element={<AdminUsers />} />

</Route>


        {/* DEFAULT ROOT */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* STUDENT ROUTES */}
        <Route element={<Layout />}>

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/help"
            element={
              <PrivateRoute>
                <Help />
              </PrivateRoute>
            }
          />

          <Route
            path="/suggestions"
            element={
              <PrivateRoute>
                <Suggestion />
              </PrivateRoute>
            }
          />

          <Route
            path="/complaints"
            element={
              <PrivateRoute>
                <Complaints />
              </PrivateRoute>
            }
          />

          <Route
            path="/tiffin"
            element={
              <PrivateRoute>
                <Tiffin />
              </PrivateRoute>
            }
          />

          <Route
            path="/laundry"
            element={
              <PrivateRoute>
                <Laundry />
              </PrivateRoute>
            }
          />

          <Route
            path="/room"
            element={
              <PrivateRoute>
                <RoomCleaning />
              </PrivateRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <PrivateRoute>
                <Payments />
              </PrivateRoute>
            }
          />
          {/* <Route
  path="/my-payments"
  element={
    <PrivateRoute>
      <StudentPayments />
    </PrivateRoute>
  }
/> */}


        </Route>

        {/* INVALID URLs */}
        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import Suggestion from "./pages/Suggestion";

// PROTECTED ROUTE WRAPPER
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =======================
            PUBLIC ROUTES
        ======================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* =======================
            PROTECTED ROUTES
        ======================== */}
        <Route element={<Layout />}>

          <Route
            path="/"
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

        </Route>

        {/* DEFAULT REDIRECT - If invalid page */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

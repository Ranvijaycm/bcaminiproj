import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* You can add more: */}
          {/* <Route path="/services" element={<Services />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

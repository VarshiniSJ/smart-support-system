
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateTicket from "./pages/CreateTicket";

function DashboardRedirect() {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Navigate to="/" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    return <Navigate to="/" replace />;
  }

  if (user.role === "CUSTOMER") {
    return <Navigate to="/customer-dashboard" replace />;
  }

  if (user.role === "AGENT") {
    return <Navigate to="/agent-dashboard" replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardRedirect />} />

        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />
        <Route
  path="/create-ticket"
  element={<CreateTicket />}
/>

        <Route
          path="/agent-dashboard"
          element={<DashboardRedirect />}
        />

        <Route
          path="/admin-dashboard"
          element={<DashboardRedirect />}
        />

        

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

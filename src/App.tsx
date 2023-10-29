import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CRUDPage from "./pages/CRUDPage";
import useAuth from "./store/auth";
import AdminLayout from "./components/AdminLayout";

const App = () => {
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "client" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="crud" element={<CRUDPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

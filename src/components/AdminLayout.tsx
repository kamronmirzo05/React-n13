import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <header></header>
      <Outlet />
      <footer></footer>
    </div>
  );
};

export default AdminLayout;

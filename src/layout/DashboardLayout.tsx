import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="p-3">
      <Navbar />

      <main>
        <Outlet />
      </main>
      <footer>
        <div className="flex justify-evenly mt-4">
          <h2>The Editorial Scholar</h2>
          <div className="flex gap-3">
            <NavLink to="#">Privacy Policy</NavLink>
            <NavLink to="#">Terms of Service</NavLink>
            <NavLink to="#">Archive Access</NavLink>
          </div>
          <p>
            &copy; {new Date().getFullYear()} The Editorial Scholar. A digital
            Curator Experience
          </p>
        </div>
      </footer>
    </div>
  );
}

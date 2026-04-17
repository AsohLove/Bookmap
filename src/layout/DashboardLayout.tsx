import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="p-3">
        <Navbar />

        <main>
            <Outlet />
        </main>
        
    </div>
  )
}

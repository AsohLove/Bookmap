import { NavLink, Outlet } from "react-router";

export default function ReadingList() {
  return (
    <div>
      <h1>CURATED ARCHIVE</h1>
      <h2>Your Personal <br />
      Reading Collection</h2>
      <p>A sanctuary for the written word. Review, organize, and explore the <br />
      literary journey you've curated for yourself.</p>
      <main>
          <Outlet />
      </main>

      <footer className="flex justify-between m-3">
        <div className="mt-3 ">
          <h2>The Editorial Scholar</h2>
          <p>&copy; {new Date().getFullYear()} The Editorial Scholar. A Digital Curator Experience.</p>
        </div>
        <div className="flex gap-4">
          <NavLink to="#">Privacy Policy</NavLink>
          <NavLink to="#">Terms of Service</NavLink>
          <NavLink to="#">Archive Access</NavLink>
        </div>
      </footer>
    </div>
  )
}

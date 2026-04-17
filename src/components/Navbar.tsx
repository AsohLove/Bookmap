import { NavLink } from "react-router";
import {User } from 'lucide-react'

export default function Navbar() {
  return (
    <div>
      <h1>The Editorial Scholar</h1>
      <div>
        <nav>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="readingList">READING LIST</NavLink>
        </nav>
        <User />
      </div>
    </div>
  );
}

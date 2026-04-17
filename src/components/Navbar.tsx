import { NavLink } from "react-router";
import {User } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <h1>The Editorial Scholar</h1>
      <div className="flex gap-3">
        <nav className="flex gap-3">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="readingList">READING LIST</NavLink>
        </nav>
        <User />
      </div>
      
    </div>
  );
}

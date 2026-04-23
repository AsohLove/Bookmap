import { NavLink } from "react-router";
import {User } from 'lucide-react'

export default function Navbar() {

  const navStyle = ({isActive}: {isActive: boolean}) => 
    isActive ? "font-semibold text-sm border-b-2 border-orange-600 pb-1" 
             : "hover:text-gray-500 text-sm dark:hover:text-gray-300 transition font-semibold"
  
  return (
    <div className="flex justify-around">
      <h1 className="text-slate-800 text-2xl font-semibold">The Editorial Scholar</h1>
      <div className="flex gap-3">
        <nav className="flex gap-3">
          <NavLink to="/" className={navStyle}>HOME</NavLink>
          <NavLink to="readingList" className={navStyle}>READING LIST</NavLink>
        </nav>
        <User size={20}/>
      </div>
      
    </div>
  );
}

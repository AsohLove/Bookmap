import { NavLink } from "react-router";
import {User } from 'lucide-react'

export default function Navbar() {

  const navStyle = ({isActive}: {isActive: boolean}) => 
    isActive ? "font-semibold text-red-500 text-sm border-b-2 border-orange-600 pb-1" 
             : "hover:text-red-500 text-sm dark:hover:text-red-300 transition font-semibold"
  
  return (
    <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:justify-around md:items-center">
      <h1 className="text-slate-800 text-xl md:text-3xl font-semibold">The Editorial Scholar</h1>
      <div className="flex items-center justify-between md:justify-end gap-3">
        <nav className="flex flex-wrap gap-5">
          <NavLink to="/" className={navStyle}>HOME</NavLink>
          <NavLink to="readingList" className={navStyle}>READING LIST</NavLink>
        </nav>
        <User size={20} className="cursor-pointer hover:text-red-500"/>
      </div>
      
    </div>
  );
}

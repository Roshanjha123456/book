"use client";
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [open , setOpen] = useState(true)

  const pathname = usePathname() 
  const handleClick = () => {
    setOpen(!open); // Toggle the state
  };


const mypath = pathname.split("/")[1]

console.log(mypath , ":::::::::::::::::::::::::")

  return (
mypath == "book" ?
   
    <nav
    className={
      open
        ? `bg-[black] fixed w-[100%] z-[9999999999999999] opacity-[0.8]`
        : `bg-[black] fixed h-[100vh] w-[100vw] z-[999999999999999] opacity-[0.8]`
    }
  >
    {open ? (
      <GiHamburgerMenu  size={30} onClick={handleClick} className="opacity-[5] m-[10px] cursor-pointer" />
    ) : (
     
      <RxCross1 size={30} onClick={handleClick} className="m-[20px] cursor-pointer"/>
    )}


    {!open && 
      <div className="text-center flex flex-col">
        <Link href={"/"} className="text-[40px]" onClick={()=>setOpen(!open)}>Home </Link>
        <Link href={""} className="text-[40px]" onClick={()=>setOpen(!open)}>About</Link>
        <Link href={"/book"} className="text-[40px]" onClick={()=>setOpen(!open)}>Books</Link>
 
       <Link href={"/contact"} className="text-[40px]" onClick={()=>setOpen(!open)}>Contact</Link>
      </div>
  

    }

  </nav> :  

<nav
className={
  open
    ? `bg-[black] fixed sm:h-[100vh] h-[50px] w-[50px] z-[9999999999999999] opacity-[0.8] `
    : `bg-[black] fixed h-[100vh] w-[100vw] z-[999999999999999] opacity-[0.8] `
}
>
{open ? (
  <GiHamburgerMenu  size={30} onClick={handleClick} className="opacity-[5] m-[10px] cursor-pointer" />
) : (
 
  <RxCross1 size={30} onClick={handleClick} className="m-[20px] cursor-pointer"/>
)}


{!open && 
  <div className="text-center flex flex-col">
    <Link href={"/"} className="text-[40px]" onClick={()=>setOpen(!open)}>Home </Link>
    <Link href={""} className="text-[40px]" onClick={()=>setOpen(!open)}>About</Link>
    <Link href={"/book"} className="text-[40px]" onClick={()=>setOpen(!open)}>Books</Link>

   <Link href={"/contact"} className="text-[40px]" onClick={()=>setOpen(!open)}>Contact</Link>
  </div>


}

</nav>
 


  )
}

export default Navbar

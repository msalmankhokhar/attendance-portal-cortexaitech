"use client"
import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

  const pathname = usePathname()
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)
  const mobileMenuHandler = ()=>{ setMobileMenuOpen(!mobileMenuOpen) }

  return (
      <nav className="flex items-center gap-5 py-3 px-5 sm:px-10 justify-between bg-white shadow-sm">
          <Logo />
          <div className="flex items-center justify-center gap-5">
            <ul className="hidden items-center justify-center gap-5 sm:flex">
                <li><Link href="/" className={`${pathname=='/'?'nav-link-current' : null} text-sm font-semibold text-gray-600 leading-none`}>Home</Link></li>
                <li><Link href="/contact" className={`${pathname=='/contact'?'nav-link-current' : ''} text-sm font-semibold text-gray-600 leading-none`}>Contact Us</Link></li>
                {/* <li><Link href="/login" className={`${pathname=='/login'?'nav-link-current' : ''} text-gray-600 text-sm font-semibold leading-none`}>Login</Link></li> */}
            </ul>
            <ul id='mobile-menu' style={{maxWidth: '270px', minWidth: '100px'}} className={`flex flex-col items-center justify-center gap-10 sm:hidden bg-white fixed top-0 left-0 h-screen z-10 w-full transition-all duration-300 ${mobileMenuOpen==false ? 'menu-open' : null}`}>
                <li><Link href="/" className={`${pathname=='/'?'nav-link-current' : null} text-sm font-semibold text-gray-600 leading-none`}>Home</Link></li>
                <li><Link href="/contact" className={`${pathname=='/contact'?'nav-link-current' : ''} text-sm font-semibold text-gray-600 leading-none`}>Contact Us</Link></li>
                {/* <li><Link href="/login" className={`${pathname=='/login'?'nav-link-current' : ''} text-gray-600 text-sm font-semibold leading-none`}>Login</Link></li>
                <li><Link href="/signup" className="bg-slate-800 text-white font-bold py-3 px-5 rounded-full text-xs leading-none">Sign Up</Link></li> */}
            </ul>
            {/* <Link href="/signup" className="bg-slate-800 text-white font-bold py-3 px-5 rounded-full text-xs leading-none hidden sm:block">Sign Up</Link> */}
            <button id='menu-toggle-btn' className='flex items-center justify-center' onClick={mobileMenuHandler}>
              <FontAwesomeIcon icon={faBars} className='sm:hidden text-xl mt-2 mr-3'/>
            </button>
          </div>
      </nav>
  )
}

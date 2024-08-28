"use client"
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeButton from './ThemeButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarChart } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket, faCalendarAlt, faChartSimple, faGear, faPeopleGroup, faUsers } from '@fortawesome/free-solid-svg-icons'
import MenuItem from './MenuItem'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ContextData } from '@/Context'
import NavContentEmployee from './NavContent/NavContentEmployee'
import NavContentAdmin from './NavContent/NavContentAdmin'

export default function Navbar({adminMode = false}) {
  const router = useRouter()
  const { user, setUser } = useContext(ContextData)
  const { sideMenuOpenEmployee, setSideMenuOpenEmployee } = useContext(ContextData)
  const pathname = usePathname()

  const logOut = () => {
    if (pathname.startsWith('/admin')) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    } else {
      localStorage.removeItem('token')
      router.push('/login')
    }
    setUser({})
  }

  return (
    <nav className={`bg-white dark:bg-slate-950 lg:static transition-all duration-300 fixed z-20 top-0 bottom-0 flex flex-col gap-7 py-3 px-3 w-full shadow-md dark:border-r-2 border-slate-600 ${sideMenuOpenEmployee ? '' : 'menu-close'}`} style={{ minWidth: '240px', maxWidth: '240px' }}>
      <div className='flex flex-col gap-2'>
        <Logo className='logo-wrapper hidden lg:flex items-center gap-2'/>
      </div>
      { adminMode ? <NavContentAdmin/> : <NavContentEmployee /> }
      <hr />
      <ul className="flex flex-col gap-1 items-center">
        <MenuItem
          text='Sign Out'
          icon={faArrowRightFromBracket}
          onClick={logOut}
        />
      </ul>
    </nav>
  )
}

import React from 'react'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ThemeButton from '@/components/ThemeButton'
import Logo from '@/components/Logo'
import BtnPrimary from '@/components/Buttons/BtnPrimary'
import Navbar from '@/components/Navbar'
import { useContext } from 'react'
import { ContextData } from '@/Context'
import { toast } from 'react-toastify'
import { toastMapper } from '@/Config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import DashboardCard from '@/components/DashboardCard'

export default function Index() {
  const router = useRouter()
  const { admin, setAdmin } = useContext(ContextData)
  const [pageVisible, setPageVisible] = useState(false);
  useEffect(() => {
    setPageVisible(true)
    const token = localStorage.getItem('adminToken')
    // if (user === null) {
      if (token) {
        // fetching Admin from server
        const payLoad = { token }
        fetch('/api/admin/getadmin', {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: { "Accept" : "application/json", "Content-Type": "application/json" }
          }).then(response=>{
            return response.json()
          }).then(json=>{
            if (json.success) {
              console.log(json);
              setAdmin(json.admin)
            } else if (json.msg === "No Admin Found") {
              localStorage.removeItem('adminToken')
              router.push('/admin/login')
              toast.error("Session Expired. Plz Log In Again")
            }
          }).catch(error=>{
            console.log("Failed to fetch", error)
            toast.error("Cannot Connect to the server")
          })
      }else{
        toast('Please Log in to access dashboard')
        router.push('/admin/login')
      }
    // }
  }, [router, setAdmin])


  return (
    <>
      <main id='main' className={`flex transition-all duration-500 ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar adminMode />
        <div className='flex flex-col px-5 py-1 gap-5 flex-grow min-h-screen'>
          <section className='flex items-center justify-between gap-5 rounded-md py-5'>
            <p className='dark:text-white'>Welcome Back, <strong>{admin && admin?.firstName} {admin && admin?.lastName}</strong></p>
            <div className="flex items-center gap-5">
              <ThemeButton absolute={false} />
              {/* <div className='flex text-base text-gray-600 dark:text-white font-bold leading-none'>Admin Dashboard</div> */}
            </div>
          </section>
          <section className='flex items-center justify-between gap-5'>
              <h1 className='dark:text-white font-semibold leading-none text-lg'>Employee Attendance</h1>
              <span className='text-sm text-neutral-600 dark:text-white'>13 January, 2024</span>
          </section>
          <section className='flex items-center justify-center gap-5'>
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
          </section>
        </div>
      </main>
    </>
  )
}

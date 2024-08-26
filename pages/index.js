import React, { useMemo } from 'react'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ThemeButton from '@/components/ThemeButton'
import Logo from '@/components/Logo'
import BtnPrimary from '@/components/Buttons/BtnPrimary'
import Navbar from '@/components/Navbar'
import { useContext } from 'react'
import { ContextData } from '@/Context'
import { toast } from 'react-toastify'
import { mappedtoast, toastMapper } from '@/Config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck, faClock, faClose, faGear, faL, faPeopleGroup, faPersonWalking, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import DashboardCard from '@/components/DashboardCard'
import { getDateToday } from "@/Config";
import { faCalendar, faCalendarCheck, faCalendarXmark, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import AttendanceRow from '@/components/AttendanceRow'
import Popup from '@/components/Popup'
import TimePicker from '@/components/TimePicker'
import { Joan } from 'next/font/google'

export default function Index() {
  const router = useRouter()
  const { user, setUser } = useContext(ContextData)
  const [pageVisible, setPageVisible] = useState(false)
  const [attendanceList, setAttendanceList] = useState([])
  const [loadingAttendanceList, setLoadingAttendanceList] = useState(true)
  const [ checkInPopup, setCheckInPopup ] = useState(false)
  const [ checkOutPopup, setCheckOutPopup ] = useState(false)
  const [ checkInTimeToday, setCheckInTimeToday ] = useState(null)
  const [ checkOutTimeToday, setCheckOutTimeToday ] = useState(null)
  const [attendMarked, setAttendMarked] = useState(false);
  const isUserEmpty = useMemo(() => Object.keys(user).length === 0, [user])
  const dateToday = getDateToday()

  const fetchAttendanceList = async ()=> {
    console.log("fetchattendanceList runnng")
    if (! isUserEmpty) {
      console.log("went in if fAL")
      try {
        const payLoad = { 
          employee : user._id,
        }
        console.log(payLoad);
        const response = await fetch('/api/fetch-attendance-list', {
              method: 'POST',
              body: JSON.stringify(payLoad),
              headers: { "Accept" : "application/json", "Content-Type": "application/json" }
            })
        const json = await response.json()
        console.log(json);
        if (json.success) {
          setLoadingAttendanceList(false)
          setAttendanceList(json.attendanceList)
        } else{
          // mappedtoast(json.msgType, json.msg)
        }
      } catch (error) {
        console.log(error.toString())
      }
    }
  }

  async function markAttendance(status, checkIn = undefined, checkOut = undefined) {
    try {
      const payLoad = { 
        employee : user._id,
        date : dateToday,
        status, checkIn, checkOut
      }
      const response = await fetch('/api/set-attendance', {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: { "Accept" : "application/json", "Content-Type": "application/json" }
          })
      const json = await response.json()
      if (json.success) {
        // toast.success(`You have been Marked ${status}`)
        if (status === 'Present') {
          setAttendMarked(true)
          await fetchAttendanceList()
        } else{
          setAttendMarked(false)
          await fetchAttendanceList()
        }
      } else{
        mappedtoast(json.msgType, json.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIn = ()=>{
    setCheckInPopup(true)
  }
  const checkOut = ()=>{
    setCheckOutPopup(true)
  }

  useEffect(() => {
    setPageVisible(true)

    const fetchAttendance = async ()=> {
      if (! isUserEmpty) {
        console.log("went in if fA")
        try {
          const payLoad = { 
            employee : user._id,
            date : getDateToday()
          }
          const response = await fetch('/api/fetch-attendance', {
                method: 'POST',
                body: JSON.stringify(payLoad),
                headers: { "Accept" : "application/json", "Content-Type": "application/json" }
              })
          const json = await response.json()
          if (json.success) {
            if (json.attendance.status === 'Present') {
              setAttendMarked(true)
              if( json.attendance.checkIn ){ setCheckInTimeToday(json.attendance.checkIn) }
              if( json.attendance.checkOut ){ setCheckOutTimeToday(json.attendance.checkOut) }
            } else{
              setCheckInTimeToday(null)
              setCheckOutTimeToday(null)
            }
          } else{
            mappedtoast(json.msgType, json.msg)
          }
        } catch (error) {
          console.log(error.toString())
        }
      }
    }

    const token = localStorage.getItem('token')
    if (isUserEmpty) {
      if (token) {
        // fetching User from server
        console.log("Fetching user from server");
        const payLoad = { token }
        fetch('/api/getuser', {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: { "Accept" : "application/json", "Content-Type": "application/json" }
          }).then(response=>{
            return response.json()
          }).then(json=>{
            if (json.success) {
              setUser(json.user)
              fetchAttendance()
              fetchAttendanceList()
            } else if (json.msg === "No User Found") {
              toast.error("Session Expired. Log In Again")
              localStorage.removeItem('token')
              router.push('/login') 
            }
          }).catch(error=>{
            console.log("Failed to fetch", error)
            toast.error("Cannot Connect to the server")
          })
      }else{
        toast('Please Log in to access dashboard')
        router.push('/login')
      }
    } else{
      fetchAttendance()
      fetchAttendanceList()
    }
  }, [isUserEmpty, router, setUser, user])


  return (
    <>
      <main id='main' className={`flex transition-all duration-500 ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <div className='flex flex-col px-5 py-1 gap-5 flex-grow min-h-screen'>
          <section className='flex items-center justify-between gap-5 mt-5'>
            <p className='dark:text-white text-gray-600'>Welcome Back, <strong className='font-semibold text-black dark:text-white'>{user?.firstName} {user?.lastName}</strong></p>
            <div className="flex items-center gap-5">
              <div className='flex text-base text-gray-600 dark:text-white font-semibold leading-none'>HR Management Portal</div>
              <ThemeButton absolute={false} />
            </div>
          </section>
          <section className='flex gap-5 items-center justify-between p-5 border dark:border-slate-700 rounded-md'>
            <div className='flex flex-col gap-3'>
              <span className='text-xs text-slate-600 dark:text-white font-semibold'>Today</span>
              <span className='text-2xl font-bold text-slate-700 dark:text-white'>{dateToday.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {
                attendMarked ?
                  <div className='flex gap-3 py-2 px-5 bg-green-50 dark:bg-slate-800 rounded-md self-start'>
                    <FontAwesomeIcon icon={faClipboardCheck} className='text-sm text-green-600 dark:text-green-400' />
                    <span className='text-xs text-green-600 font-semibold dark:text-green-400'>Attendance Marked</span>
                  </div> :
                  <div className='flex gap-3 py-2 px-5 bg-red-50 dark:bg-slate-800 rounded-md self-start'>
                    <FontAwesomeIcon icon={faCalendarXmark} className='text-sm text-red-600 dark:text-red-400' />
                    <span className='text-xs text-red-600 font-semibold dark:text-red-400'>Attendance Not Marked Yet</span>
                  </div>
              }
            </div>
            <div className='flex flex-col gap-2 self-start'>
              {
                attendMarked ? <button onClick={ ()=>{ markAttendance('Absent'); setCheckInTimeToday(null); setCheckOutTimeToday(null); fetchAttendanceList() } } className='font-semibold px-5 py-2 text-xs text-white bg-red-600 rounded-md'>Mark as Absent</button> :
                <button onClick={ ()=>{ markAttendance('Present') } } className='font-semibold px-5 py-2 text-xs text-white bg-green-600 rounded-md'>Mark as Present</button>
              }
              {
                checkInTimeToday ?
                <div className='border dark:border-transparent flex items-center gap-3 py-2 px-5 bg-green-50 dark:bg-slate-800 rounded-md'>
                  <FontAwesomeIcon icon={faClock} className='leading-none text-sm text-green-600 dark:text-green-400' />
                  <span className='leading-none text-xs text-green-600 font-semibold dark:text-green-400'>{new Date(checkInTimeToday).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
                :
                <button onClick={checkIn} className='min-w-full flex gap-3 py-2 px-5 bg-green-600 rounded-md self-start'>
                  <FontAwesomeIcon icon={faCalendarCheck} className='text-sm text-white' />
                  <span className='text-xs text-white font-semibold'>Check In</span>
                </button>
              }
              {
                checkOutTimeToday ? 
                <div className='border dark:border-transparent flex items-center gap-3 py-2 px-5 bg-green-50 dark:bg-slate-800 rounded-md'>
                  <FontAwesomeIcon icon={faPersonWalking} className='leading-none text-sm text-green-600 dark:text-green-400' />
                  <span className='leading-none text-xs text-green-600 font-semibold dark:text-green-400'>{new Date(checkOutTimeToday).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
                :
                <button onClick={checkOut} className='min-w-full flex gap-3 py-2 px-5 bg-violet-600 rounded-md self-start'>
                  <FontAwesomeIcon icon={faPersonWalking} className='text-sm text-white' />
                  <span className='text-xs text-white font-semibold'>Check Out</span>
                </button>
              }
            </div>
          </section>

          {/* check In popup */}
          <Popup
          onClose={()=>{ setCheckInPopup(false) }}
          hidden={checkInPopup === true ? false : true}
          content={
            (
              <>
              <div className='flex flex-col gap-3 items-center justify-center'>
                <div className='text-2xl font-semibold dark:text-white px-5 py-3 rounded-md border dark:border-slate-700 flex gap-3 items-center'>
                  <FontAwesomeIcon icon={faCalendar}/>
                  <span>{dateToday.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>  
                </div>
                <TimePicker onCancel={()=>{ setCheckInPopup(false) }} markAttendance={markAttendance} setCheckInTimeToday={setCheckInTimeToday}/>
              </div>
              </>
            )
          }
          />

          {/* check Out popup */}
          <Popup
          onClose={()=>{ setCheckOutPopup(false) }}
          hidden={checkOutPopup === true ? false : true}
          content={
            (
              <>
              <div className='flex flex-col gap-3 items-center justify-center'>
                <div className='text-2xl font-semibold dark:text-white px-5 py-3 rounded-md border dark:border-slate-700 flex gap-3 items-center'>
                  <FontAwesomeIcon icon={faCalendar}/>
                  <span>{dateToday.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>  
                </div>
                <TimePicker title='Check Out' onCancel={()=>{ setCheckOutPopup(false) }} markAttendance={markAttendance} setCheckInTimeToday={setCheckOutTimeToday}/>
              </div>
              </>
            )
          }
          />

          <section>
            <table className='w-full table-fixed'>
              <thead>
                <tr>
                  <th className='text-left px-4 py-3 font-semibold text-sm rounded-l-md bg-slate-100 dark:bg-slate-700 dark:text-white'>Date</th>
                  <th className='text-left py-3 font-semibold text-sm bg-slate-100 dark:bg-slate-700 dark:text-white'>Status</th>
                  <th className='text-left py-3 font-semibold text-sm bg-slate-100 dark:bg-slate-700 dark:text-white'>Check In</th>
                  <th className='text-left py-3 font-semibold text-sm bg-slate-100 dark:bg-slate-700 dark:text-white'>Check Out</th>
                  <th className='text-left py-3 font-semibold text-sm bg-slate-100 dark:bg-slate-700 dark:text-white'>Work Logs</th>
                  <th className='text-left py-3 font-semibold text-sm rounded-r-md bg-slate-100 dark:bg-slate-700 dark:text-white'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  attendanceList.map((attendence)=>{
                    return (
                    <>
                    <AttendanceRow key={`${attendence._id}1`} attendance={attendence}/>
                    </>
                  )
                  })
                }
              </tbody>
            </table>
            {
              attendanceList.length === 0 ? 
              (<div className='flex justify-center px-3 py-7'>
                <p className='w-2/3 font-semibold text-red-600 text-base text-center'>No records found</p> 
              </div>) : null
            }
          </section>
        </div>
      </main>
    </>
  )
}

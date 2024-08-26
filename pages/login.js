import React, { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import ThemeButton from '@/components/ThemeButton';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import { toastMapper } from '@/Config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ContextData } from '@/Context';
import Link from 'next/link';


export default function Login() {
  const router = useRouter()
  const { user, setUser } = useContext(ContextData)
  const [ loading, setLoading ] = useState(false)

  async function submitHandler(event){
    event.preventDefault()
    setLoading(true)
    const validationStatus = event.target.checkValidity()
    const formData = new FormData(event.target)
    const payLoad = { "email": formData.get("email"), "password": formData.get("password") }
    console.log(payLoad)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(payLoad),
        headers: { "Accept" : "application/json", "Content-Type": "application/json" }
      })
      const json = await response.json()
      setLoading(false)
      if (json.success) {
        const token = json.token
        localStorage.setItem('token', token)
        router.push('/')
        toastMapper[json.msgType](json.msg);
      }else{
        toastMapper[json.msgType](json.msg);
      }
    } catch (error) {
      console.log(response)
      console.log("Failed to fetch", error)
      toast.error("Cannot Connect to the server")
      setLoading(false)
    }
  }

  const [pageVisible, setPageVisible] = useState(false);
  const [userLoggedin, setUserLoggedin] = useState(true);
  useEffect(() => {
    console.log(user);
    const token = localStorage.getItem('token')
    if (token) {
      console.log("user is logged in");
      router.push('/')
    } else{
      setUserLoggedin(false)
    }
    setPageVisible(true)
  }, [router, user])

  if (!userLoggedin) {
    return (
      <>
        <ThemeButton absolute={true} />
        <main id='main' className={`bg-slate-100 dark:bg-slate-800 min-h-screen transition-opacity duration-500 ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
          <section className='sm:px-10 px-2 py-5'>
            <div className="flex justify-center">
              <div className='flex flex-col gap-10 max-w-screen-xs w-full'>
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-gray-300 pb-5">
                  <Logo />
                  <h1 className='text-lg font-semibold text-slate-700 dark:text-white'>HR Management Portal</h1>
                </div>
                <div className='flex flex-col gap-5 border border-slate-300 sm:px-8 px-5 py-8 rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 shadow-md'>
                  <form id='form' className='flex flex-col gap-5 rounded-sm' onSubmit={submitHandler}>
                    <h1 className='text-slate-800 dark:text-white font-semibold text-xl text-center'>Log In as Employee</h1>
                    <div className='flex flex-col gap-3'>
                      <input type="email" className='bg-white dark:bg-slate-800 dark:text-white border border-gray-300 dark:border-slate-600 py-3 px-5 rounded-full text-xs outline-none focus:ring-2 ring-yellow-400' name='email' placeholder='Email' required />
                      <input type="password" className='bg-white dark:bg-slate-800 dark:text-white border border-gray-300 dark:border-slate-600 py-3 px-5 rounded-full text-xs outline-none focus:ring-2 ring-yellow-400' name='password' placeholder='Password' required />
                    </div>
                    <BtnPrimary
                    type='submit' 
                    text={"Log In as Employee"}
                    loader={loading}
                    />
                  </form>
                  <div className="flex gap-2 items-center">
                    <div className="w-full bg-gray-300 leading-none h-px flex-grow"></div>
                    <span className="text-xs text-gray-600 dark:text-white font-semibold">OR</span>
                    <div className="w-full bg-gray-300 leading-none h-px flex-grow"></div>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <Link href="#" className='text-xs text-slate-500 dark:text-white self-center font-semibold'>Forgot Password ?</Link>
                    <Link href="/admin/login" className='text-xs text-slate-500 dark:text-white self-center font-semibold'>Log In as Admin</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  } else {
    return null
  }
    
}
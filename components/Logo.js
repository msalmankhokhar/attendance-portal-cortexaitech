import React from 'react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ContextData } from '@/Context'

export default function Logo({ className = 'logo-wrapper flex items-center gap-2' }) {

  const { theme, setTheme } = useContext(ContextData)

  return (
    <div className={className}>
      <img className="logo-icon" src="/logos/Web/SVG/icon-only-logo.svg" alt="Cortex AI Tech Icon" />
      <img className="logo-img mt-3" src={`/logos/Web/text-only-logo-full-${theme === "Light" ? "black" : "white"}.png`} alt="Cortex AI Tech Logo" />
    </div>
    // <div className='text-2xl font-bold text-center'>
    //   HR Management System
    // </div>
  )
}

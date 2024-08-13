import React from 'react'
import Logo from './Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone, faMapLocation, faEnvelope} from '@fortawesome/free-solid-svg-icons'

export default function FooterDark() {
    return (
        <footer id="footer" className="flex flex-col px-28 bg-black">
          <div className="py-14 flex justify-between border-b border-slate-400">
            <div className="flex flex-col gap-3">
              <Logo textColor="white"/>
              <p className="text-xs text-white max-w-xs">Cortex AI Tech is a cutting-edge technology company dedicated to advancing AI technology and providing high-quality services to businesses at reasonable costs.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-bold text-white">Quick Links</h1>
              <ul className="flex flex-col gap-1">
                <li><a href="#" className="text-white text-2xs">Home</a></li>
                <li><a href="#" className="text-white text-2xs">Careers</a></li>
                <li><a href="#" className="text-white text-2xs">Support</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-bold text-white">Quick Links</h1>
              <ul className="flex flex-col gap-1">
                <li><a href="#" className="text-white text-2xs">Web Development</a></li>
                <li><a href="#" className="text-white text-2xs">Data Analysis</a></li>
                <li><a href="#" className="text-white text-2xs">App Development</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-sm font-bold text-white">Contact Us</h1>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                    <FontAwesomeIcon icon={faPhone} className="text-white text-2xs"/>
                  </div>
                  <span className="text-white text-2xs">+92-318-6456552</span>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xs"/>
                  </div>
                  <span className="text-white text-2xs">info@cortexaitech.com</span>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                    <FontAwesomeIcon icon={faMapLocation} className="text-white text-2xs"/>
                  </div>
                  <span className="text-white text-2xs">Sector H/9-2 Islamabad, Pakistan</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-5">
            <p className="text-2xs text-center text-gray-200">{`Copyright 2024. All Rights Reserved`}</p>
          </div>
        </footer>
    )
}

import "@/styles/globals.css";
import { Outfit as Font } from "next/font/google";
import Context from "@/Context";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const font = Font({ subsets: ["latin"], weight : ['300', '400', '500', '600', '700'] });

export default function App({ Component, pageProps }) {

  useEffect(()=>{
    AOS.init({
      duration: 600,
      offset: 0,
      mirror: true
    })
  }, [])

  return (
    <>
      <Context>
        <style jsx global>{`
          html {
            font-family: ${font.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
        <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        transition={Slide}
        autoClose={4000}
        limit={2}
        />
      </Context>
    </>
  )
}
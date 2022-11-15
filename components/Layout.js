import React from 'react'
import Navbar from './Navbar';
import Footer from "./Footer";
import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <>
    <Head>
        <title>KnowledgeSwap</title>
        {/* <link rel="icon"  type="image/x-icon" href= "../assets/favicon_package_v0/favicon.ico" /> */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon_package_v0/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon_package_v0/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon_package_v0/favicon-16x16.png" />
        <link rel="manifest" href="../assets/favicon_package_v0/site.webmanifest" />
        <link rel="mask-icon" href="../assets/favicon_package_v0/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta> */}
    </Head>

        <Navbar/>
            {children}
        <Footer />
    </>
  )
}

export default Layout
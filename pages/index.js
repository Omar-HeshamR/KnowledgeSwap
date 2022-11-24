import React, {useLayoutEffect, useState} from "react"
import { useWindowScroll } from "react-use"
import Section1 from "../components/MainPageComponents/Section1"
import Section2 from "../components/MainPageComponents/Section2"
import Section3 from "../components/MainPageComponents/Section3"
import Section4 from "../components/MainPageComponents/Section4"
import Section5 from "../components/MainPageComponents/Section5"
import Section6 from "../components/MainPageComponents/Section6"
import Section7 from '../components/MainPageComponents/Section7'
import FreeMint from "../components/MainPageComponents/FreeMintCircle"
import MovingNavbar from "../components/MainPageComponents/MovingNavbar"

export default function Home() {


  const [newNavbar, setNewNavbar] = useState(null)
  const {y} = useWindowScroll();

  useLayoutEffect(()=> {
     if(y > 1){
      setNewNavbar(true)
     }else{
      setNewNavbar(false)
     }
  },[y])


  return (
    <>

    {newNavbar &&  <MovingNavbar />}

    <FreeMint />

    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />  
    <Section5 />
    <Section6 />
    <Section7 />
  

    </>
  )
}


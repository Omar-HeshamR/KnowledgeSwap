import React, { useEffect } from 'react'
import styled from 'styled-components'
import "@fontsource/red-hat-display"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import MainSection1Image_light from '../assets/MainSection1Image_light.svg'
import Particle from '../components/Particle.js';
import { motion } from "framer-motion"
import HeroBackground1 from '../assets/HeroBackground1.jpg'
import HeroNavbar from './HeroNavbar';

const MainSection1 = () => {

  const router = useRouter()

  function learnmore(){
    router.push("/about")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Section>
      {/* <Image src={Background}/> */}

      <ImageBox>
        <Image src={HeroBackground1} alt="Main Photo" layout='fill'/>
      </ImageBox>
      
      <Container> 

      <HeroNavbar />

        <TextBox>
          <Heading 
          as={motion.div} 
          initial = {{ y: -150, opacity: 0, scale: 0.5}}
          transition = {{ duration: 2}}
          animate = {{y: 0, opacity: 1, scale: 1}}
          >Solving Anything and Everything</Heading>

          <SubHeading
          as={motion.div}
          initial = {{ x: -400, opacity: 0, scale: 2}}
          transition = {{ duration: 2}}
          animate = {{x: 0, opacity: 1, scale: 1}}
          >The ultimate platform where you can exchange, share, and gain unprecedented knowledge.</SubHeading>

          <LearnMoreButton onClick={learnmore}
          as={motion.button}
          initial = {{ y: 200, opacity: 0, rotate: 30}}
          transition = {{ type:"spring", stiffness: 30, damping: 5}}
          animate = {{y: 0, opacity: 1, rotate: 0}} 
          whileHover = {{scale: 0.9}}
          >LEARN MORE</LearnMoreButton>
        </TextBox>
        {/* <ImageBox>
          <IconContainer><Image src={MainSection1Image_light} /></IconContainer>
        </ImageBox> */}


      </Container>

    </Section>
  )
}

const Section = styled.div`
display: flex;
width: 100%;
height: 100vh;
color: ${props => props.theme.backgroundColor};
// background-color: ${props => props.theme.backgroundColor};
justify-content: center;
align-items: center;

// height: 100vh;
// background-image: url(${Background});
// background-position: center;
// background-size: cover;
// background-color: yellow;
`

const Container = styled.div`
display: flex;
position: absolute;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
// background-color: khaki;
`

const TextBox = styled.div`
display: flex;
flex-direction: column;
width: 95%;
height: 95%;
justify-content: center;
align-items: center;
// background-color: yellow;
`
const ImageBox = styled.div`
position: relative;
width: 100%;
height: 100%;
background-color: yellow;
justify-content: center;
align-items: center;

img{
  filter: brightness(23%);
}
`
const Heading = styled.div`
margin-top: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontHeading_large};
font-weight: ${props => props.theme.fontBold};
text-align: center;
`
const SubHeading = styled.div`
font-family: "Red Hat Display", sans-serif; 
font-weight: ${props => props.theme.fontlight};
text-align: center;
width: 50%;
font-size: ${props => props.theme.fontSubheading_small};
margin: 2vw 0;
`
const LearnMoreButton = styled.button`
display: flex;
background-color: ${props => props.theme.buttonBackground_color};
color:  ${props => props.theme.buttonText_color};
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size:  ${props => props.theme.fontButton_large};
font-weight: ${props => props.theme.fontBold};
padding  ${props => props.theme.buttonPadding_large};
border: none;
&:hover{
  cursor: pointer;
}
`
const IconContainer = styled.div`

img{
  width: 40vw;
  height: 16.4vw;
  transition: all 0.3s ease;
}
`

export default MainSection1
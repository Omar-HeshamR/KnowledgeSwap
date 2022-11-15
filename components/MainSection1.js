import React from 'react'
import styled from 'styled-components'
import "@fontsource/red-hat-display"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import ExchangeIcon from '../assets/ExchangeIcon.svg'
import Particle from '../components/Particle.js';

const MainSection1 = () => {

  const router = useRouter()

  function learnmore(){
    router.push("/about")
  }

  return (
    <Section>
            <Particle />
      <Container>
        <TextBox>
          <Heading>Incentivizing the Spread of Knowledge</Heading>
          <SubHeading>A modern platform where you can exchange, share, and gain unprecedented knowledge.</SubHeading>
          <LearnMoreButton onClick={learnmore}>LEARN MORE</LearnMoreButton>
        </TextBox>
        <ImageBox>
          <IconContainer><Image src={ExchangeIcon} /></IconContainer>
        </ImageBox>
      </Container>
    </Section>
  )
}

const Section = styled.div`
display: flex;
width: 100%;
height: 40vw;
background-color: #F7F0F5;
justify-content: center;
align-items: center;
// background-color: darkcyan;
`
const Container = styled.div`
display: flex;
width: 90%;
height: 90%;
justify-content: center;
align-items: center;
// background-color: blanchedalmond;
flex-direction: row;
`
const TextBox = styled.div`
display: flex;
flex-direction: column;
// background-color: khaki;
width: 48%;
height: 95%;
margin-right: auto;
justify-content: center;
align-items: center;
`
const ImageBox = styled.div`
display: flex;
// flex-direction: column;
// background-color: lavender;
width: 48%;
height: 95%;
margin-left: auto;
justify-content: center;
align-items: center;
`
const Heading = styled.div`
margin-top: auto;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-size: 4vw;
font-weight: 900;
text-align: center;
`
const SubHeading = styled.div`
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-weight: 100;
text-align: center;
width: 85%;
font-size: 1.25vw;
margin: 2vw 0;
`
const LearnMoreButton = styled.button`
display: flex;
background-color: #FF0000;
color: #F7F0F5;
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: 2.25vw;
font-weight: 900;
padding 0.75vw 1vw;
border: none;
background-color: ff0000;
&:hover{
  cursor: pointer;
}
`
const IconContainer = styled.div`

img{
  // background-color: yellow;
  width: 100%;
  height: 41%;
  // transform: scale(1.4); stupid
  transition: all 0.3s ease;
}
`

export default MainSection1
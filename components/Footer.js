import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import Logo from '../assets/KnowledgeSwapLogo.png'
import "@fontsource/red-hat-display"
import InstagramLogo from '../assets/InstagramIcon.png'
import TronLogo from '../assets/TronLogo.png'
import TwitterLogo from '../assets/TwitterLogo.png'
import Link from 'next/link';
import { useRouter } from 'next/router'

const Footer = () => {


  const router = useRouter()
  function goToHomePage() {
    router.push("/")
  }


  return (
    <Section>
      <Container>
          <MainDiv>
            <Third>
              <IconButton><Image src={InstagramLogo} /></IconButton>
              <IconButton><Image src={TronLogo} /></IconButton>
              <IconButton><Image src={TwitterLogo} /></IconButton>
            </Third>

            <Third>
              <FooterButton>Contact Us</FooterButton>
            </Third>

            <Third>
              <FooterButton2>Donate!</FooterButton2>
            </Third>
          </MainDiv>
          <MinorDiv onClick={goToHomePage}>
              <LogoContainer><Image src={Logo} /></LogoContainer>
              <LogoText>KnowledgeSwap</LogoText>
          </MinorDiv>
      </Container>
    </Section>
  )
}

const Section = styled.div`
border-top: 0.5vw dashed red;
background-color: #F7F0F5;
display: flex;
width: 100%;
height: 20vw;
justify-content: center;
align-items: center;
// background-color: yellowgreen;
`
const Container = styled.div`
display: flex;
width: 95%;
height: 90%;
justify-content: center;
align-items: center;
// background-color: lime;
flex-direction: column;
`
const MainDiv = styled.div`
display: flex;
width: 95%;
height: 65%;
justify-content: center;
align-items: center;
// background-color: orangered;
margin: auto 0;
flex-direction: row;
`
const MinorDiv = styled.div`
display: flex;
width: 29%;
height: 30%;
justify-content: center;
align-items: center;
// background-color: steelblue;
margin: auto 0;
flex-direction: row;
&:hover{
  cursor: pointer;
  transform: scale(1.05);
}
`
const LogoText = styled.div`
display: flex;
font-size: 3vw;
font-weight: 900;
// background-color: yellow;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
margin: auto auto;
&:hover{
  cursor: pointer;
  // transform: scale(1.05);
}
`
const LogoContainer = styled.div`
display: flex;
margin: auto auto;
img{
  width: 4vw;
  height: 4.8vw;
}
`
const Third = styled.div`
display: flex;
width: 33%;
height: 95%;
justify-content: center;
align-items: center;
// background-color: gold;
margin: auto auto;
`
const FooterButton = styled.div`
border: none;
font-size: 3vw;
font-weight: 900;
// padding: 0.75vw 1.5vw;
display: flex;
justify-content: center;
align-items: center;
width: 18vw;
height: 5vw;
background-color: #FF0000;
color: #F7F0F5;

&:hover{
  cursor: pointer;
}
`
const FooterButton2 = styled.div`
border: none;
font-size: 3vw;
letter-spacing: 0.25vw;
font-weight: 900;
// padding: 0.75vw 1.5vw;
display: flex;
justify-content: center;
align-items: center;
width: 18vw;
height: 5vw;
background-color: #FF0000;
color: #F7F0F5;

&:hover{
  cursor: pointer;
}
`
const IconButton = styled.div`
border: none;
margin: auto auto;
// font-size: 3vw;
font-weight: 900;
padding: 1vw 1vw;
background-color: #FF0000;
justify-content: center;
align-items: center;
border-radius: 1vw;

&:hover{
  cursor: pointer;
  transform: scale(1.10);
}

img{
  display: block;
  margin: auto auto;
  width: 3vw;
  height: 3vw;

}
`

export default Footer
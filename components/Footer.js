import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import Logo from '../assets/KnowledgeSwapLogo.png'
import "@fontsource/red-hat-display"
import InstagramLogo from '../assets/InstagramIcon.png'
import DiscordLogo from '../assets/DiscordFooterIcon.png'
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
              <IconButton><Image src={DiscordLogo} /></IconButton>
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
border-top: 0.5vw dashed white;

color: ${props => props.theme.backgroundColor};
background-color: ${props => props.theme.textColor};
display: flex;
width: 100%;
height: 20vw;
justify-content: center;
align-items: center;
`
const Container = styled.div`
display: flex;
width: 95%;
height: 90%;
justify-content: center;
align-items: center;
flex-direction: column;
`
const MainDiv = styled.div`
display: flex;
width: 95%;
height: 65%;
justify-content: center;
align-items: center;
margin: auto 0;
flex-direction: row;
`
const MinorDiv = styled.div`
display: flex;
width: 29%;
height: 30%;
justify-content: center;
align-items: center;
margin: auto 0;
flex-direction: row;
&:hover{
  cursor: pointer;
  transform: scale(1.05);
}
`
const LogoText = styled.div`
display: flex;
font-size: ${props => props.theme.fontSubheading_large};
font-weight: ${props => props.theme.fontBold};
font-family: "Red Hat Display", sans-serif; 
margin: auto auto;
&:hover{
  cursor: pointer;
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
margin: auto auto;
`
const FooterButton = styled.div`
border: none;
font-size: ${props => props.theme.fontButton_large};
padding: ${props => props.theme.buttonPadding_large};
font-weight: ${props => props.theme.fontBold};
display: flex;
justify-content: center;
align-items: center;
// width: 18vw;
// height: 5vw;
background-color: ${props => props.theme.backgroundColor};
color: ${props => props.theme.textColor};

&:hover{
  cursor: pointer;
}
`
const FooterButton2 = styled.div`
border: none;
font-size: ${props => props.theme.fontButton_large};
padding: ${props => props.theme.buttonPadding_large};
// letter-spacing: 0.25vw;
font-weight: ${props => props.theme.fontBold};
display: flex;
justify-content: center;
align-items: center;
// width: 18vw;
// height: 5vw;
background-color: ${props => props.theme.backgroundColor};
color: ${props => props.theme.textColor};

&:hover{
  cursor: pointer;
}
`
const IconButton = styled.div`
border: none;
margin: auto auto;
padding: 1vw 1vw;
background-color: ${props => props.theme.backgroundColor};
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
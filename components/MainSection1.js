import React from 'react'
import styled from 'styled-components'
import "@fontsource/red-hat-display"
import { useRouter } from 'next/router'
import Background from '../assets/MainSection1_background.jpg'
import Particle from '../components/Particle.js';

const MainSection1 = () => {

  const router = useRouter()

  function learnmore(){
    router.push("/about")
  }

  return (
    <Section>
      <Container > 
      <Particle />

        <TextBox>
          <Heading>Incentivizing the Spread of Knowledge</Heading>
          <SubHeading>The platform where you can exchange, share, and gain unprecedented knowledge.</SubHeading>
          <LearnMoreButton onClick={learnmore}>LEARN MORE</LearnMoreButton>
        </TextBox>

      </Container>

    </Section>
  )
}

const Section = styled.div`
display: flex;
width: 100%;
height: 40vw;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
justify-content: center;
align-items: center;
background-image: url(${Background});
background-position: center;
background-size: cover;
`

const Container = styled.div`
display: flex;
position: relative;
width: 90%;
height: 90%;
justify-content: center;
align-items: center;
// flex-direction: row;
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

const Heading = styled.div`
margin-top: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontHeading_medium};
font-weight: ${props => props.theme.fontBold};
text-align: center;
`
const SubHeading = styled.div`
font-family: "Red Hat Display", sans-serif; 
font-weight: ${props => props.theme.fontlight};
text-align: center;
width: 35%;
font-size: ${props => props.theme.fontParagraph_large};
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

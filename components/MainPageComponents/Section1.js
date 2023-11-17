import React, { useEffect } from 'react'
import styled from 'styled-components'
import "@fontsource/red-hat-display"
import Image from 'next/image'
import { useRouter } from 'next/router'
import HeroBackground1 from '../../assets/MainPageAssets/Section1Assets/HeroBackground1.jpg'
import HeroNavbar from './HeroNavbar'

const Section1 = () => {

  const router = useRouter()

  function learnmore(){
    router.push("/about")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Section>

      <ImageBox>
        <Image src={HeroBackground1} alt="Main Photo" layout='fill'/>
      </ImageBox>
      
      <Container> 

        <HeroNavbar />

          <TextBox>
            <Heading>Solving Anything and Everything</Heading>
            <SubHeading>The ultimate platform where you can exchange, share, and gain unprecedented knowledge.</SubHeading>
            <LearnMoreButton onClick={learnmore}>LEARN MORE</LearnMoreButton>
          </TextBox>

      </Container>
    </Section>
  )
}

const Section = styled.div`
display: flex;
width: 100%;
height: 100vh;
color: ${props => props.theme.backgroundColor};
@media (max-width: 1024px){
  height: 40vh;
}
`
const Container = styled.div`
display: flex;
position: absolute;
width: 100%;
height: 100%;
align-items: center;
flex-direction: column;
@media (max-width: 1024px){
  height: 40vh;
} 
`
const TextBox = styled.div`
display: flex;
flex-direction: column;
width: 95%;
height: 95%;
align-items: center;
`
const ImageBox = styled.div`
position: relative;
width: 100%;
height: 100%;
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
background-color: ${props => props.theme.buttonBackground_color};
color:  ${props => props.theme.buttonText_color};
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size:  ${props => props.theme.fontButton_large};
font-weight: ${props => props.theme.fontBold};
padding:  ${props => props.theme.buttonPadding_large};
border: none;
&:hover{
  cursor: pointer;
}
`
export default Section1
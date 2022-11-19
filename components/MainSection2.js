import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import { ST } from 'next/dist/shared/lib/utils';
import { motion, useScroll } from "framer-motion"
import Teachers from '../assets/Teachers.jpg'
import Exams from '../assets/Exams.jpg'
import Learning from '../assets/Learning.jpg'

const MainSection2 = () => {
  return (
    <Section>
      <Container>

        <StatDiv
        as={motion.div}
        initial = {{ x: -400, opacity: 0, scale: 2}}
        transition = {{ duration: 2}}
        animate = {{x: 0, opacity: 1, scale: 1}}
        >
          <TextDiv><StatText><p>Students who Actively Asked Questions Performed <b>200%</b> Better on Exams.</p></StatText></TextDiv>
          <ImageDiv><Image src={Exams} alt="Exams" /></ImageDiv>
        </StatDiv>


        <StatDiv>
          <TextDiv><StatText><p>Learning New Information Regularly Allows you Problem-Solve <b>45%</b> Faster.</p></StatText></TextDiv>
          <ImageDiv><Image src={Learning} alt="Learning" /></ImageDiv>
        </StatDiv>


        <StatDiv>
        <TextDiv><StatText><p>More than <b>90%</b> of Teachers Globally are Underpaid. </p></StatText></TextDiv>
        <ImageDiv><Image src={Teachers} alt="Teachers" /></ImageDiv>
        </StatDiv>
      
    
      </Container>

    </Section>
  )
}

const Section = styled.div`
height: 100vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
// background-color: khaki;
`
const Container = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(3, 1fr);
flex-direction: comlumn;
width: 90%;
height: 80%;
justify-content: center;
align-items: center;
// background-color: lavender;
`
const StatDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 95%;
height: 12vw;
margin: auto auto;
// background-color: orangered;
box-shadow: 1vw 1vw 1vw grey;
// border: 0.5vw solid ${props => props.theme.textColor};
`
const TextDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 70%;
// background-color: green;
height: 100%;
`
const StatText = styled.header`
display: flex;
// background-color: yellow;
width: 95%;
font-size: 3vw;
font-weight: 100;
`


const ImageDiv = styled.div`
width: 30%;
height: 100%;
margin-left: auto;
// background-color: yellow;
display: flex;

img{
  margin: auto auto;
  height: 10vw;
  width: 18vw;
}
`

export default MainSection2
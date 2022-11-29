import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Teachers from '../../assets/MainPageAssets/Section4Assets/Teachers.jpg'
import Exams from '../../assets/MainPageAssets/Section4Assets/Exams.jpg'
import Learning from '../../assets/MainPageAssets/Section4Assets/Learning.jpg'

const Section4 = () => {
  return (
    <Section>
      <Container>

        <StatDiv>
          <TextDiv><StatText><p>Learners who Actively Asked Questions Performed <b>200%</b> Better on Exams.</p></StatText></TextDiv>
          <ImageDiv><Image src={Exams} alt="Exams" /></ImageDiv>
        </StatDiv>

        <StatDiv>
          <TextDiv><StatText><p>Learning New Information Regularly Allows you Problem-Solve <b>45%</b> Faster.</p></StatText></TextDiv>
          <ImageDiv><Image src={Learning} alt="Learning" /></ImageDiv>
        </StatDiv>

        <StatDiv>
        <TextDiv><StatText><p>Up to <b>90%</b> of Teachers Around the Globe are Underpaid. </p></StatText></TextDiv>
        <ImageDiv><Image src={Teachers} alt="Teachers" /></ImageDiv>
        </StatDiv>
        
      </Container>
    </Section>
  )
}

const Section = styled.div`
height: 50vw;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
const Container = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(3, 1fr);
width: 90%;
height: 90%;
`
const StatDiv = styled.div`
display: flex;
width: 95%;
height: 12vw;
margin: auto auto;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
`
const TextDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 70%;
`
const StatText = styled.header`
width: 95%;
font-size:  ${props => props.theme.fontSubheading_large};
font-weight: ${props => props.theme.fontLight};
`
const ImageDiv = styled.div`
width: 30%;
display: flex;
img{
  margin-left: auto;
  height: 12vw;
  width: 20vw;
  filter: brightness(80%);
}
`
export default Section4
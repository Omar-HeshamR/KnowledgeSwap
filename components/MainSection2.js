import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import FutureIcon from '../assets/Future.svg'
import StudentsIcon from '../assets/Students.svg'

const MainSection2 = () => {
  return (
    <Section>
      <Container>
        <LeftDiv> <Heading>Why does Education Matter?</Heading>
            <InfoContainer>
              <Paragraph>Education is the first step in bringing the world closer together. Access to education established a well-rooted foundation in which people can easily comprehend new information.</Paragraph>
              <IconContainer><Image src={StudentsIcon} /></IconContainer>
            </InfoContainer>
        </LeftDiv>

        <RightDiv> <Heading>Why is Eduaction the Future?</Heading>
            <InfoContainer>
              <Paragraph>As the world is immersed in the information age, embracing and grasping new methods, technologies, and ideas becomes increasingly essential. Undoubtedly, education is the latest tool of communication and power.</Paragraph>
              <IconContainer><Image src={FutureIcon} /></IconContainer>
            </InfoContainer>
        </RightDiv>
      </Container>
    </Section>
  )
}

const Section = styled.div`
height: 35vw;
width: 100%;
display: flex;
background-color: brown;
justify-content: center;
align-items: center;
background-color: #F7F0F5;
`
const Container = styled.div`
display: flex;
flex-direction: row;
// background-color: lightyellow;
width: 90%;
height: 90%;
justify-content: center;
align-items: center;
`
const LeftDiv = styled.div`
display: flex;
// background-color: navajowhite;
width: 49%;
height: 30vw;
justify-content: center;
align-items: center;
margin-right: auto;
flex-direction: column;
`
const RightDiv = styled.div`
display: flex;
// background-color: mistyrose;
width: 49%;
height: 30vw;
justify-content: center;
align-items: center;
margin-left: auto;
flex-direction: column;
`
const Heading = styled.div`
// background-color: yellow;
color: #FF0000;
display: flex;
font-size: 3vw;
font-weight: 900;
margin-bottom: auto;
`
const InfoContainer = styled.div`
// background-color: orangered;
margin: auto 0;
width: 90%;
height: 60%;
justify-content: space-between;
align-items: center;
flex-direction: row;
display: flex;
`
const Paragraph = styled.div`
color: #FF0000;
width: 49%;
height: 95%;
justify-content: center;
align-items: center;
display: flex;
// background-color: paleturquoise;
font-weight: 100;
font-size: 1.5vw;
text-align: center;
// margin-right: auto;
`
const IconContainer = styled.div`
display: flex;
width: 49%;
height: 95%;
justify-content: center;
align-items: center;
// background-color: lime;
// margin-left: auto;

img{
  width: 15vw;
  height: 15vw;
}
`


export default MainSection2
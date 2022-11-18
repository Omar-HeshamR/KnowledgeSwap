import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import MainSection2Image_left_light from '../assets/MainSection2Image_left_light.svg'
import MainSection2Image_right_light from '../assets/MainSection2Image_right_light.svg'

const MainSection2 = () => {
  return (
    <Section>
      <Container>
        <LeftDiv> <Heading>Why does Education Matter?</Heading>
            <InfoContainer>
              <Paragraph>Education is the first step in bringing the world closer together. Access to education established a well-rooted foundation in which people can easily comprehend new information.</Paragraph>
              <IconContainer><Image src={MainSection2Image_left_light} /></IconContainer>
            </InfoContainer>
        </LeftDiv>

        <RightDiv> <Heading>Why is Eduaction the Future?</Heading>
            <InfoContainer>
              <Paragraph>As the world is immersed in the information age, embracing new methods, technologies, and ideas is essential. Undoubtedly, education is the latest tool of communication and power.</Paragraph>
              <IconContainer><Image src={MainSection2Image_right_light} /></IconContainer>
            </InfoContainer>
        </RightDiv>
      </Container>
    </Section>
  )
}

const Section = styled.div`
height: 30vw;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
const Container = styled.div`
display: flex;
flex-direction: row;
width: 90%;
height: 90%;
justify-content: center;
align-items: center;
`
const LeftDiv = styled.div`
display: flex;
width: 49%;
height: 25vw;
justify-content: center;
align-items: center;
margin-right: auto;
flex-direction: column;
`
const RightDiv = styled.div`
display: flex;
width: 49%;
height: 25vw;
justify-content: center;
align-items: center;
margin-left: auto;
flex-direction: column;
`
const Heading = styled.div`
display: flex;
font-size: ${props => props.theme.fontSubheading_large};
font-weight: ${props => props.theme.fontBold};
margin-bottom: auto;
`
const InfoContainer = styled.div`
margin: auto 0;
width: 90%;
height: 60%;
justify-content: space-between;
align-items: center;
flex-direction: row;
display: flex;
`
const Paragraph = styled.div`
width: 49%;
height: 95%;
justify-content: center;
align-items: center;
display: flex;
font-weight: ${props => props.theme.fontLight};
font-size: ${props => props.theme.fontParagraph_medium};
text-align: center;
`
const IconContainer = styled.div`
display: flex;
width: 49%;
height: 95%;
justify-content: center;
align-items: center;

img{
  width: 15vw;
  height: 10vw;
}
`


export default MainSection2
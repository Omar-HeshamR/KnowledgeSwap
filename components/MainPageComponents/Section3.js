import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from "framer-motion"
import QuestionIcon from '../../assets/MainPageAssets/Section3Assets/confused-confusion-icon.svg'
import RapidIcon from '../../assets/MainPageAssets/Section3Assets/speed-icon.svg'
import EarnIcon from '../../assets/MainPageAssets/Section3Assets/hand-money-dollar-coin-icon.svg'
import GraspIcon from '../../assets/MainPageAssets/Section3Assets/open-book-icon.svg'

const Section3 = () => {
    return (
        <Section>
            <Container>

                <IconDiv>

                    <ItemDiv>
                        <Circle><Icon as={motion.div} variants={farLeft_icon} initial="a" whileInView="b"><Image src={QuestionIcon}/></Icon></Circle>
                        <Possibility>Solve all Inquiries + Problems</Possibility>
                    </ItemDiv>
                    
                    <ItemDiv>
                        <Circle><Icon as={motion.div} variants={nearLeft_icon} initial="a" whileInView="b"><Image src={RapidIcon}/></Icon></Circle>
                        <Possibility>Receive Answers Rapidly</Possibility>
                    </ItemDiv>

                    <ItemDiv>
                        <Circle><Icon as={motion.div} variants={nearRight_icon} initial="a" whileInView="b"><Image src={EarnIcon}/></Icon></Circle>
                        <Possibility>Earn for your Knowledge</Possibility>
                    </ItemDiv>

                    <ItemDiv>
                        <Circle><Icon as={motion.div} variants={farRight_icon} initial="a" whileInView="b"><Image src={GraspIcon}/></Icon></Circle>
                        <Possibility>Grasp New Content + Information</Possibility>
                    </ItemDiv>

                </IconDiv>

                  <Heading>Imagine the Endless Possibilities</Heading>

            </Container>
        </Section>
    )
}

const Section = styled.div`
display: flex;
width: 100%;
height: 50vw;
align-items: center;
color: ${props => props.theme.textColor};
background: linear-gradient(
    to bottom,
    ${props => props.theme.textColor} 0%,
    ${props => props.theme.textColor} 36%,
    ${props => props.theme.backgroundColor} 36%,
    ${props => props.theme.backgroundColor} 100%
  );
`
const Container = styled.div`
display: flex;
width: 100%;
height: auto;
flex-direction: column;
`
const IconDiv = styled.div`
display: flex;
width: 80%;
height: 25vw;
margin: 5vw auto;
`
const ItemDiv = styled.div`
display: flex;
width: 25vw;
height: 25vw;
align-items: center;
flex-direction: column;
`
const Circle = styled.div`
display: flex;
width: 18vw;
height: 18vw;
justify-content: center;
align-items: center;
border-radius: 5%;
background-color: grey;
// img{
//     width: 10vw;
//     height: 10vw;
// }
`
const Icon = styled.div`
// background-color: yellow;
img{
  width: 10vw;
  height: 10vw;
}
`
const Possibility = styled.text`
text-align: center;
margin: auto auto;
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
`
const Heading = styled.text`
display: flex;
justify-content: center;
font-size: ${props => props.theme.fontTitle_default};
font-weight: ${props => props.theme.fontBold};
`
const farLeft_icon = {
    a: {
      opacity: 0,
    },
    b: { 
      opacity: 1, 
      transition: {
        duration: 0.5
      }
    }
}
const nearLeft_icon = {
    a: {
      opacity: 0,
    },
    b: { 
      opacity: 1,
      transition: {
        duration: 1
      }
    }
}
const nearRight_icon = {
    a: {
      opacity: 0, 
    },
    b: { 
      opacity: 1, 
      transition: {
        duration: 1.5,
      }
    }
}
const farRight_icon = {
  a: {
    opacity: 0, 
  },
  b: { 
    opacity: 1, 
    transition: {
      duration: 2,
    }
  }
}
export default Section3
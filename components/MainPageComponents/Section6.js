import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from "framer-motion"
import Arrows from '../../assets/MainPageAssets/Section6Assets/Arrows.svg'

const Section6 = () => {
    return (
        <Section>
            <Container> 
                
                <ArrowLeft as={motion.div} variants={leftArrow_animation} initial="a" whileInView="b"><Image src={Arrows} alt="Next"/></ArrowLeft>
                <ArrowRight as={motion.div} variants={rightArrow_animation} initial="a" whileInView="b"><Image src={Arrows} alt="Next"/></ArrowRight>

                <Heading>A framework that empowers and incentivizes the art of learning, gaining, and spreading knowledge.</Heading>

                <FrameworkContainer>

                    <FrameworkDiv as={motion.div} variants={askersBox_animation} initial="a" whileInView="b">
                        <Title>Askers</Title>
                        <Paragraph >Ask any of your inquiries as clearly and concisely as possible, then set your bounty. Placing higher bounties is recommended for faster and more thoughtful, and more engaging responses. You may also set a 0 bounty. You may then award the bounty to the most helpful/favorable answer.</Paragraph>
                    </FrameworkDiv>

                    <FrameworkDiv as={motion.div} variants={repliersBox_animation} initial="a" whileInView="b">
                        <Title>Repliers</Title>
                        <Paragraph>To maximize your chance of earning the bounty, refine your response as much as possible. Not only can you earn, but you can also earn credibility tokens if the asker chooses your answer as valid. Increasing credibility boosts recognition and increases eligibility for the credibility rewards program. </Paragraph>
                    </FrameworkDiv>

                    <FrameworkDiv as={motion.div} variants={learnersBox_animation} initial="a" whileInView="b">
                        <Title>Learners</Title>
                        <Paragraph>If you wish to study or comprehend info, the learning tool is effective in aiding you. View any question you want to observe and analyze its response(s); discussions surrounding the question allow you to view all thoughts. Not only can Learn help you outside the application, but it can also train you to answer inquiries. </Paragraph>
                    </FrameworkDiv>

                </FrameworkContainer>

            </Container>
        </Section>
    )
  }

const Section = styled.div`
display: flex;
height: 50vw;
justify-content: center;
`
const Container = styled.div`
display: flex;
width: 90%;
height: 90%;
justify-content: center;
align-items: center;
flex-direction: column;
`
const Heading = styled.text`
text-align: center;
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
width: 50%;
margin-bottom: 5vw;
`
const FrameworkContainer = styled.div`
display: flex;
width: 95%;
height: 60%;
justify-content: space-between;
align-items: center;
`
const FrameworkDiv = styled.div`
display: flex;
width: 30%;
height: 95%;
justify-content: center;
align-items: center;
flex-direction: column;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
`
const Title = styled.div`
font-size: ${props => props.theme.fontParagraph_large};
font-weight: ${props => props.theme.fontBold};
margin-bottom: 2vw;
`
const Paragraph = styled.div`
text-align: left;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
width: 80%;
`
const ArrowLeft = styled.div`
z-index: 100;
margin-right: 30%;
margin-top: 10%;
position: absolute;
img{
    width: 6vw;
    height: 6vw;
}
`
const ArrowRight = styled.div`
z-index: 100;
margin-left: 30%;
margin-top: 10%;
position: absolute;
img{
    width: 6vw;
    height: 6vw;
}
`
const askersBox_animation = {
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
const repliersBox_animation = {
    a: {
      opacity: 0, 
    },
    b: { 
      opacity: 1,
      transition: {
        duration: 2, delay: 0.5,
      }
    }
}
const learnersBox_animation = {
    a: {
      opacity: 0,
    },
    b: { 
      opacity: 1,
      transition: {
        duration: 2, delay: 1,
      }
    }
}
const leftArrow_animation = {
    a: {
      opacity: 0, 
    },
    b: { 
      opacity: 1, 
      transition: {
        duration: 2, delay: 0.25,
      }
    }
}
const rightArrow_animation = {
    a: {
      opacity: 0, 
    },
    b: { 
      opacity: 1,
      transition: {
        duration: 2, delay: 0.75,
      }
    }
}
export default Section6
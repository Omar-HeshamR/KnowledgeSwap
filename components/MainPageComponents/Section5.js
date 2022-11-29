import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from "framer-motion"
import DepressedIcon from '../../assets/MainPageAssets/Section5Assets/depressed-icon.svg'
import DollarSignIcon from '../../assets/MainPageAssets/Section5Assets/dollar-sign-icon.svg'
import PadlockIcon from '../../assets/MainPageAssets/Section5Assets/padlock-black-icon.svg'
import ShareIcon from '../../assets/MainPageAssets/Section5Assets/share-round-icon.svg'
import LimitedIcon from '../../assets/MainPageAssets/Section5Assets/stop-blocked-icon.svg'
import LongTimeIcon from '../../assets/MainPageAssets/Section5Assets/time-expire-icon.svg'

const Section5 = () => {
  return (
    <Section>

      <Container>

        <Heading><p>We Understand Your Struggle: <b>Today&apos;s Education Just Isn&apos;t It</b></p></Heading>

        <Grid>

          <GridDiv>
            <IconDiv as={motion.div} variants={iconAnimation} whileInView="b"><Image src={LimitedIcon} alt="Education is only available to a few"/></IconDiv>
            <TextDiv>
              <Problem>Education is only available to a few</Problem>
              <Elaboration as={motion.div} variants={elaborationAnimation} initial="a" whileInView="b">Whatever you may try to do, some individuals always have a better quality of education, even if you have great merit.</Elaboration>
              <Solution as={motion.div} variants={solutionAnimation_left} initial="a" whileInView="b">What if there was a platform that provided the same opportunities for everyone? </Solution>
            </TextDiv>
          </GridDiv>

          <GridDiv>
            <IconDiv as={motion.div} variants={iconAnimation} whileInView="b"><Image src={DollarSignIcon} alt="Access to information can be pricey"/></IconDiv>
            <TextDiv>
              <Problem>Access to information can be pricey</Problem>
              <Elaboration as={motion.div} variants={elaborationAnimation} initial="a" whileInView="b">Many educational applications overcharge their users by implementing insane subscription fees for nothing. </Elaboration>
              <Solution  as={motion.div} variants={solutionAnimation_right} initial="a" whileInView="b">What if there was an application that guaranteed access by only participation?</Solution>
            </TextDiv>
          </GridDiv>

          <GridDiv>
          <IconDiv as={motion.div} variants={iconAnimation} whileInView="b"><Image src={ShareIcon} alt="There is little incentive to share information"/></IconDiv>
            <TextDiv>
              <Problem>There is little incentive to share information</Problem>
              <Elaboration as={motion.div} variants={elaborationAnimation} initial="a" whileInView="b">There is no incentive for anyone to share the information you need; no current platform rewards this. </Elaboration>
              <Solution as={motion.div} variants={solutionAnimation_left} initial="a" whileInView="b">What if you gained an incredible bounty every time you answered an inquiry? </Solution>
            </TextDiv>
          </GridDiv>

          <GridDiv>
            <IconDiv as={motion.div} variants={iconAnimation} whileInView="b"><Image src={DepressedIcon} alt="Lack of resources prevents comprehension"/></IconDiv>
            <TextDiv>
              <Problem>Lack of resources prevents comprehension</Problem>
              <Elaboration as={motion.div} variants={elaborationAnimation} initial="a" whileInView="b">Even when you receive information, it may need to be more comprehensive in that you can understand it 100%. </Elaboration>
              <Solution  as={motion.div} variants={solutionAnimation_right} initial="a" whileInView="b">What if you receive a practical and thoughtful response to every question you ask? </Solution>
            </TextDiv>
          </GridDiv>

          <GridDiv>
            <IconDiv as={motion.div} variants={iconAnimation} whileInView="b"><Image src={LongTimeIcon} alt="It can take a long time to receive information"/></IconDiv>
            <TextDiv>
              <Problem>It can take a long time to receive information</Problem>
              <Elaboration as={motion.div} variants={elaborationAnimation} initial="a" whileInView="b">Even when you post a question, getting even a single view can take weeks and months, hindering your progress. </Elaboration>
              <Solution  as={motion.div} variants={solutionAnimation_left} initial="a" whileInView="b">What if you could control the amount of time it would take to get accurate responses? </Solution>
            </TextDiv>
          </GridDiv>

          <GridDiv>
            <IconDiv as={motion.div} variants={iconAnimation} whileInView="b"><Image src={PadlockIcon} alt="Education is simply centralized"/></IconDiv>
            <TextDiv>
              <Problem>Education is simply centralized</Problem>
              <Elaboration as={motion.div} variants={elaborationAnimation} initial="a" whileInView="b">Education is simply controlled by centralized institutions which favor and disfavor those they choose to.  </Elaboration>
              <Solution  as={motion.div} variants={solutionAnimation_right} initial="a" whileInView="b">What if gaining and grasping new information was done in a decentralized manner? </Solution>
            </TextDiv>
          </GridDiv>

        </Grid>
        
      </Container>

    </Section>
  )
}

const Section = styled.div`
display: flex;
height: 80vw;
justify-content: center;
align-items: center;
color: black;
background: linear-gradient(
  to bottom,
  ${props => props.theme.textColor} 0%,
  ${props => props.theme.textColor} 26%,
  ${props => props.theme.backgroundColor} 26%,
  ${props => props.theme.backgroundColor} 100%
);
`
const Container = styled.div`
display: flex;
width: 95%;
height: 70vw;
justify-content: space-between;
align-items: center;
flex-direction: column;
`
const Heading = styled.text`
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontLight};
text-align: center;
width: 60%;
margin-bottom: 4vw;
color: ${props => props.theme.backgroundColor};
`
const Grid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(3, 1fr);
width: 95%;
height: 50vw;
`
const GridDiv = styled.div`
display: flex;
width: 90%;
height: 95%;
margin: auto auto;
`
const IconDiv = styled.div`
margin-bottom: auto;
margin-right: auto;
img{
  width: 5vw;
  height: 5vw;
}
`
const TextDiv = styled.div`
display: flex;
width: 34vw;
flex-direction: column;
border-bottom: 0.2vw dashed grey;
`
const Problem = styled.div`
font-size: ${props => props.theme.fontParagraph_large}; 
font-weight: ${props => props.theme.fontBold};
`
const Elaboration = styled.div`
font-size: ${props => props.theme.fontParagraph_large}; 
font-weight: ${props => props.theme.fontLight};
margin-bottom: auto;
`
const Solution = styled.div`
font-size: ${props => props.theme.fontParagraph_large}; 
font-weight: ${props => props.theme.fontLight};
font-style: italic;
margin-bottom: 2vw;
`
const solutionAnimation_left = {
  a: {
    opacity: 0, x:"-5vw",
  },
  b: { 
    opacity: 1, x: 0,
    transition: {
      duration: 2
    }
  }
}
const solutionAnimation_right = {
  a: {
    opacity: 0, x:"5vw",
  },
  b: { 
    opacity: 1, x: 0,
    transition: {
      duration: 2
    }
  }
}
const iconAnimation = {
  b: { 
    scale: [0.95, 1, 0.95],
    transition: {
      repeat: Infinity, duration: 2,  
    }
  }

}
const elaborationAnimation = {
  a: {
    opacity: 0, 
  },
  b: { 
    opacity: 1, 
    transition: {
      duration: 4
    }
  }
}
export default Section5
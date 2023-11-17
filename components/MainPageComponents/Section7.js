import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from "framer-motion"
import StudyAid from '../../assets/MainPageAssets/Section7Assets/StudyAid.svg'
import SolveBugs from '../../assets/MainPageAssets/Section7Assets/SolveBug.svg'
import HomeworkHelp from '../../assets/MainPageAssets/Section7Assets/HomeworkHelp.svg'
import ExamPrep from '../../assets/MainPageAssets/Section7Assets/ExamPrep.svg'
import ProblemSolve from '../../assets/MainPageAssets/Section7Assets/ProblemSolve.svg'
import LearnNewInfo from '../../assets/MainPageAssets/Section7Assets/LearnNewInfo.svg'
import ImproveGrades from '../../assets/MainPageAssets/Section7Assets/ImproveGrades.svg'
import SideGig from '../../assets/MainPageAssets/Section7Assets/SideGig.svg'
import ShareExperiences from '../../assets/MainPageAssets/Section7Assets/ShareExperiences.svg'

const Section7 = () => {
    return (
        <Section>
            <Container> 
                
                <Heading>KnowledgeSwap Helps...</Heading>
                <Grid>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_150ms} initial="a" whileInView="b">
                            <IconContainer><Image src={HomeworkHelp} alt="Homework Help"/></IconContainer>
                            <BenefitText>Homework Help</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_50ms} initial="a" whileInView="b">
                            <IconContainer><Image src={SolveBugs}  alt="Solve Bugs"/></IconContainer>
                            <BenefitText>Solve Bugs</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_25ms} initial="a" whileInView="b">
                            <IconContainer><Image src={SideGig} alt="Side Gig"/></IconContainer>
                            <BenefitText>Side Gig</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_175ms} initial="a" whileInView="b">
                            <IconContainer><Image src={ShareExperiences} alt="Share Experiences"/></IconContainer>
                            <BenefitText>Share Experiences</BenefitText>
                        </GridItem>
                    </GridDiv>

                        
                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_100ms} initial="a" whileInView="b">
                            <IconContainer><Image src={ProblemSolve} alt="Problem Solve"/></IconContainer>
                            <BenefitText>Problem Solve</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_225ms} initial="a" whileInView="b">
                            <IconContainer><Image src={ExamPrep} alt="Exam Prep"/></IconContainer>
                            <BenefitText>Exam Prep</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_75ms} initial="a" whileInView="b">
                            <IconContainer><Image src={StudyAid} alt="Study Aid"/></IconContainer>
                            <BenefitText>Study Aid</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_200ms} initial="a" whileInView="b">
                            <IconContainer><Image src={ImproveGrades} alt="Improve Grades"/></IconContainer>
                            <BenefitText>Improve Grades</BenefitText>
                        </GridItem>
                    </GridDiv>

                    <GridDiv>
                        <GridItem as={motion.div} variants={puzzleDelay_125ms} initial="a" whileInView="b">
                            <IconContainer><Image src={LearnNewInfo}  alt="Learn New Info"/></IconContainer>
                            <BenefitText>Learn New Info</BenefitText>
                        </GridItem>
                    </GridDiv>

                </Grid>
              
            </Container>
        </Section>
    )
  }

const Section = styled.div`
display: flex;
width: 100%;
height: 45vw;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.backgroundColor};
color: black;
`
const Container = styled.div`
display: flex;
width: 95%;
height: 80%;
align-items: center;
flex-direction: column;
`
const Heading = styled.text`
font-size: ${props => props.theme.fontTitle_default};
font-weight: ${props => props.theme.fontBold};
margin-bottom: 5vw;
`
const Grid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
width: 90%;
height: 70%;
`
const GridDiv = styled.div`
margin: auto auto;
width: 90%;
height: 80%;
`
const GridItem = styled.div`
display: flex;
align-items: center;
height: 100%;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
`
const IconContainer = styled.div`
display: flex;
margin: auto 1vw;
img{
    width: 4vw;
    height: 4vw;
}
`
const BenefitText = styled.text`
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
margin-right: auto;
`
const puzzleDelay_25ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 0.25
      }
    }
}
const puzzleDelay_50ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 0.5
      }
    }
}
const puzzleDelay_75ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 0.75
      }
    }
}
const puzzleDelay_100ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 1
      }
    }
}
const puzzleDelay_125ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 1.25
      }
    }
}
const puzzleDelay_150ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 1.5
      }
    }
}
const puzzleDelay_175ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 1.75
      }
    }
}
const puzzleDelay_200ms = {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 2
      }
    }
}
const puzzleDelay_225ms= {
    a: {
      opacity: 0, scale:0, 
    },
    b: { 
      opacity: 1, scale:1,
      transition: {
        duration: 2.25
      }
    }
}
export default Section7
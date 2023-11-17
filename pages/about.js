import React from 'react'
import styled, {keyframes} from 'styled-components'
import Particle from "../components/Particle"

const About = () => {
  return (
    <Section>
      <Particle />
      <Container>

        <StartContainer>

          <BioDiv>
            <BioText>KnowledgeSwap is the future of learning and the path to a better education. Explore new avenues of enlightenment and cultivation through a modern, global decentralized application. Join KnowledgeSwap to help spark a new revolution in knowledge sharing.</BioText>
          </BioDiv>

        </StartContainer>
          

        <ObjectivesContainer>

            <Subheading>Our Objectives</Subheading>
            <RowContainer>          
              <RowDiv>
                <TitleDiv>Spreading Education</TitleDiv>
                <Paragraph>We aim to spread education across every subject, allowing users to share and receive information endlessly on a decentralized platform. Our goal is to have a thriving community across every significant education subject.</Paragraph>
              </RowDiv>
              <RowDiv>
                <TitleDiv>Rewarding Teachers</TitleDiv>
                <Paragraph>We thrive on rewarding teachers by incentivizing them to share vital info and data across our platform. We believe this separates our application, KnowledgeSwap from the rest and gives us our cutting-edge over the rest.</Paragraph>
              </RowDiv>
            </RowContainer>
            <RegularContainer>
                <RegularDiv>
                  <TitleDiv>Insuring the Self-Sustaining Decentralized Model</TitleDiv>
                  <Paragraph>Whether we would like to admit it or not, today&apos;s world is built against those who want to learn. Whether it is high subscription costs to service, rejection from an institution of higher education, or lack of adequate resources for meaningful and thoughtful comprehension, education is getting increasingly centralized every day. Whenever there is an opportunity to attain knowledge, centralized, overarching institutions slam the doors shut. And the ones that do seemingly provide information steal data from users, as was seen by specific centralized platforms sharing student information with academic faculties. This unwelcome status quo was the catalyst for establishing KnowledgeSwap so that an environment where users have the full right to their data and their received information is formed. As the world is progressing with respect to the rights of individuals at an unprecedented rate, now is the time to dismantle any association between users and data. In addition, the implementation of KnowledgeSwap Token allows users to have a full say within the community. As the future of education, KnowledgeSwap is the next-level platform; join it to attain new information and own your right to it forever.</Paragraph>
                </RegularDiv>
            </RegularContainer>

        </ObjectivesContainer>

  
        <CommittmentsContainer>

          <Subheading>Our Committments</Subheading>

          <Grid>
            <GridDiv>
              <Committment>Becoming the Largest Platform for Homework Help</Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Accelerating the Decentralization of the Internet</Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Becoming a Tool for Studying for Exams</Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Allowing Users to Own Full Rights of Their Data</Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Utilizing Smart Contracts to Spread Information</Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Making Learning Easier and More Time-Efficent </Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Globalizing the Access to Information</Committment>
            </GridDiv>
            <GridDiv>
              <Committment>Supporting the Migration to Web3.0</Committment>
            </GridDiv>          
          </Grid>

        </CommittmentsContainer>

      </Container>
    </Section>
  )
}

const Section = styled.section`
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
const Container = styled.div`
flex-direction: column;
`
const StartContainer = styled.div`
display: flex;
justify-content: center;
`
const gradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`
const BioDiv = styled.div`
width: 81vw;
display: flex;
margin: 16vw 0;
justify-content: center;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
border-bottom: 0.5vw inset brown;
border-left: 0.5vw inset brown;
background: linear-gradient(-45deg, ${props => props.theme.textColor}, #D1233E, ${props => props.theme.textColor}, #D1233E);
background-size: 400% 400%;
animation-name: ${gradient};
animation-duration: 8s;
animation-iteration-count: infinite;
&:hover {
animation: none;
border-left: none;
border-bottom: none;
}
`
const BioText = styled.div`
width: 95%;
font-size: ${props => props.theme.fontSubheading_small};
color: ${props => props.theme.backgroundColor};
padding: 2vw 0;
font-weight: ${props => props.theme.fontBold};
`
const ObjectivesContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`
const RowContainer = styled.div`
display: flex;
margin-top: 2vw;
`
const RegularContainer = styled.div`
margin-bottom: 8vw;
`
const RowDiv = styled.div`
display: flex;
align-items: center;
width: 40vw;
margin-left: 0.5vw;
margin-right: 0.5vw;
margin-bottom: 1vw;
background-color:  ${props => props.theme.textColor};
flex-direction: column;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
border-bottom: 0.5vw inset brown;
border-left: 0.5vw inset brown;
&:hover{
  border: none;
}
`
const RegularDiv = styled.div`
display: flex;
align-items: center;
width: 81vw;
margin-top: 1vw;
background-color: ${props => props.theme.textColor};
flex-direction: column;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
border-bottom: 0.5vw inset brown;
border-left: 0.5vw inset brown;
&:hover{
  border: none;
}
`
const TitleDiv = styled.div`
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
margin: 2vw 0vw;
color: ${props => props.theme.backgroundColor};
margin-bottom: auto;
`
const Paragraph = styled.div`
margin: 2vw 0;
color: ${props => props.theme.backgroundColor};
width: 90%;
`
const CommittmentsContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`
const Grid = styled.div`
display: grid;
grid-row-gap: 0.5vw;
grid-column-gap: 0.5vw;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(4, 1fr);
width: 81vw;
margin-top: 2vw;
margin-bottom: 8vw;
`
const GridDiv = styled.div`
background-color: ${props => props.theme.textColor};
height: 4vw;
box-shadow: 0.5vw 0.5vw 1vw gainsboro, -0.1vw -0.1vw 0.5vw gainsboro;
border-bottom: 0.5vw inset brown;
border-left: 0.5vw inset brown;
background: linear-gradient(-45deg, ${props => props.theme.textColor}, #D1233E, ${props => props.theme.textColor}, #D1233E);
background-size: 400% 400%;
animation-name: ${gradient};
animation-duration: 8s;
animation-iteration-count: infinite;
&:hover{
  animation: none;
  border: none;
}
`
const Committment = styled.div`
color: ${props => props.theme.backgroundColor};
justify-content: center;
align-items: center;
height: 100%;
display: flex;
font-weight: ${props => props.theme.fontBold};
font-size: ${props => props.theme.fontParagraph_medium};
`
const Subheading = styled.div`
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`
export default About

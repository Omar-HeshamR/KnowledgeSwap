import React from 'react'
import styled, {keyframes} from 'styled-components';
import Particle from "../components/Particle"

const About = () => {
  return (
    <Section>
      <Particle />
      <Container><Title>About Us</Title>
        <BioDiv>KnowledgeSwap is the future of learning and the path to a better education. Explore new avenues of enlightenment and cultivation through a modern, global decentralized application. Join KnowledgeSwap to help spark a new revolution in knowledge sharing. </BioDiv>
        <ObjectivesContainer> <Header>Our Objectives</Header>
        <Objectives><p><b>Spreading Education: </b>We aim to spread education across every subject, allowing users to share and receive information endlessly on a decentralized platform. Our goal is to have a thriving community across every significant education subject.</p> </Objectives>
        <Objectives><p><b>Rewarding Teachers: </b>We thrive on rewarding teachers by incentivizing them to share vital information across our platform. We believe this separates KnowledgeSwap from the rest and gives us our cutting-edge.</p></Objectives>
        <Objectives><p><b>Insuring the Self-Sustaining Decentralized Model: </b>Whether we would like to admit it or not, today&apos;s world is built against those who want to learn. Whether it is high subscription costs to service, rejection from an institution of higher education, or lack of adequate resources for meaningful comprehension, education is getting increasingly centralized every day. Whenever there is an opportunity to attain knowledge, centralized, overarching institutions slam the doors shut. And the ones that do information steal data from users, as was seen by certain centralized platforms sharing student information with academic faculties. This unwelcome status quo was the catalyst for establishing KnowledgeSwap so that an environment where users have the full right to their data and their received information is formed. As the world is progressing with respect to the rights of individuals at an unprecedented rate, now is the time to dismantle any association between users and data. In addition, the implementation of KnowledgeSwap Token allows users to have a full say within the community. As the future of education, KnowledgeSwap is the next-level platform; join it to attain new information and own your right to it forever.</p></Objectives>
        </ObjectivesContainer>

        <ObjectivesContainer> <Header>Our Committments</Header>
          <Objectives>- Becoming the Largest Platform for Homework Help</Objectives>
          <Objectives>- Accelerating the Decentralization of the Internet</Objectives>
          <Objectives>- Becoming a Tool for Studying for Exams</Objectives>
          <Objectives>- Allowing Users to Own Full Rights of Their Data</Objectives>
          <Objectives>- Utilizing Smart Contracts to Reward the Spread of Information</Objectives>
          <Objectives>- Making Learning Easier and More Time-Efficent </Objectives>
          <Objectives>- Globalizing the Access to Information</Objectives>
          <Objectives>- Supporting the Migration to Web3.0</Objectives>
        </ObjectivesContainer>

        <ObjectivesContainer><Header>How Does It Work?</Header>
          <Objectives><p><b>Interested in Learning?</b> Head to the learning feed to see all educational questions and answers; it requires a minimum of owning 1000 KnowledgeSwap Tokens.</p></Objectives>
          <Objectives><p><b>Interested in Solving?</b> Head over to the solve feed to answer educational questions of your expertise. Answering a question will award you its bounty if you have the best solution.</p></Objectives>
          <Objectives><p><b>Interested in Asking?</b> Head over to the ask feed to ask any educational questions. If you want faster responses, we recommend placing a higher bounty on your question and providing the best answer to the bounty; it requires a minimum holding of 300 KnowledgeSwap Tokens.</p></Objectives>
          <Objectives><p><b>Over 11,578,231 Questions Answered!</b></p></Objectives>
        </ObjectivesContainer>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  min-height: 65vw;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F7F0F5;
  // background-color: navajowhite;
`
const Container = styled.div`
  height: 90%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: beige;
  flex-direction: column;
`
const Title = styled.div`
  font-size: 15vw;
  font-weight: 900;
  text-align: center;
  color: #FF0000;

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
  // height: 20%;
  width: 60%;
  padding: 2vw 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF0000;
  color:  #F7F0F5;
  text-align: center;
  font-size: 2vw;
  font-weight: 100;
  margin-bottom: auto;
  border-bottom: 1vw inset brown;
    border-left: 1vw inset brown;
    background: linear-gradient(-45deg, red, brown, red, brown);
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
const ObjectivesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  min-height: 50vw;
  height: auto;
  margin: 4vw auto;
  // background-color: yellow;
`
const Header = styled.div`
  display: flex;
  margin: 1vw 0;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  color: #FF0000;
  font-weight: 900;
  // background-color: azure;
`
const Objectives = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  color: #FF0000;
  font-weight: 100;
  text-align: center;
  // background-color: orangered;
  width: 100%;
  margin: 1vw 0;
  min-height: 10%;
  height: auto;
`

export default About

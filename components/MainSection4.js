import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';

const MainSection4 = () => {
  return (
    <Section>
      <Container>
        <ContainerDiv><Title>How Does It Work?</Title></ContainerDiv>
        <ContainerDiv>
            <Fact><p><b>Interested in Learning?</b> Head to the learning feed to see all educational questions and answers; it requires a minimum of owning 1000 KnowledgeSwap Tokens.</p></Fact>
        </ContainerDiv>
        <ContainerDiv>
            <Fact><p><b>Interested in Solving?</b> Head over to the solve feed to answer educational questions of your expertise. Answering a question will award you its bounty if you have the best solution.</p></Fact>
        </ContainerDiv>
        <ContainerDiv>
            <Fact><p><b>Interested in Asking?</b> Head over to the ask feed to ask any educational questions. If you want faster responses, we recommend placing a higher bounty on your question and awarding the best answer with the bounty; it requires a minimum holding of 300 KnowledgeSwap Tokens.</p></Fact>
        </ContainerDiv>
        <ContainerDiv>
            <SuperFact><p>Over 11,578,231 Questions Answered!</p></SuperFact>
        </ContainerDiv>
      </Container>
    </Section>
  )
}

const Section = styled.div`
height: 50vw;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
const Container = styled.div`
display: flex;
flex-direction: column;
width: 95%;
height: 90%;
justify-content: center;
align-items: center;
`
const ContainerDiv = styled.div`
display: flex;
width: 95%;
min-height: 18%;
height: auto;
justify-content: center;
align-items: center;
margin: auto 0;
`
const Title = styled.div`
display: flex;
text-align: center;
font-size: ${props => props.theme.fontHeading_large};
font-weight: ${props => props.theme.fontBold};
`
const Fact = styled.div`
width: 95%;
display: flex;
text-align: center;
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontLight};
`
const SuperFact = styled.div`
margin: auto auto;
display: flex;
text-align: center;
font-size: ${props => props.theme.fontSubheading_large};
font-weight: ${props => props.theme.fontBold};
`

export default MainSection4
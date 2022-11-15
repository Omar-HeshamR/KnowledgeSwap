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
background-color: brown;
justify-content: center;
align-items: center;
background-color: #F7F0F5;
// background-color: brown;
`
const Container = styled.div`
display: flex;
flex-direction: column;
// background-color: lightyellow;
width: 95%;
height: 90%;
justify-content: center;
align-items: center;
`
const ContainerDiv = styled.div`
display: flex;
// background-color: coral;
width: 95%;
min-height: 18%;
height: auto;
justify-content: center;
align-items: center;
margin: auto 0;
`
const Title = styled.div`
// background-color: yellow;
display: flex;
text-align: center;
font-size: 5vw;
font-weight: 900;
color: #FF0000;
`
const Fact = styled.div`
// background-color: yellow;
width: 95%;
display: flex;
text-align: center;
font-size: 2vw;
font-weight: 100;
color: #FF0000;
`
const SuperFact = styled.div`
// background-color: yellow;
margin: auto auto;
display: flex;
text-align: center;
font-size: 4vw;
font-weight: 900;
color: #FF0000;
`

export default MainSection4
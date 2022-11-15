import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import LimitedIcon from '../assets/Limited.svg'
import RewardIcon from '../assets/Reward.svg'

const MainSection3 = () => {
  return (
    <Section>
      <Container>
        <ContainerItem>
            <TextContainer><Heading>These days, knowledge is localized, limited, inaccessible, and scarce. As a result, this confines education from expanding its outreach.</Heading></TextContainer>
            <IconContainer><Image src={LimitedIcon} /></IconContainer>
        </ContainerItem>
        <ContainerItem>
            <IconContainer2><Image src={RewardIcon} /></IconContainer2>
            <TextContainer><Heading>We encourage and incentivize the spreading and sharing of knowledge with others who intend to learn and reward those who have learned.</Heading></TextContainer>
        </ContainerItem>
      </Container>
    </Section>
  )
}

const Section = styled.div`
height: 45vw;
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
const ContainerItem = styled.div`
display: flex;
flex-direction: row;
// background-color: lightblue;
width: 95%;
height: 45%;
justify-content: space-between;
align-items: center;
margin: auto 0;
`
const TextContainer = styled.div`
display: flex;
// flex-direction: column;
// background-color: lightgreen;
width: 75%;
height: 95%;
justify-content: center;
align-items: center;
`
const IconContainer = styled.div`
display: flex;
flex-direction: column;
// background-color: sandybrown;
width: 25%;
height: 95%;
justify-content: center;
align-items: center;

img{
    height: 15vw;
    width: 12.9vw;
}
`
const IconContainer2= styled.div`
display: flex;
flex-direction: column;
// background-color: sandybrown;
width: 25%;
height: 95%;
justify-content: center;
align-items: center;

img{
    height: 15vw;
    width: 15vw;
}
`
const Heading = styled.div`
font-weight: 900;
font-size: 3vw;
// background-color: yellow;
color: #FF0000;
display: flex;
`


export default MainSection3
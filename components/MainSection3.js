import React from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import MainSection3Image_top_light from '../assets/MainSection3Image_top_light.svg'
import MainSection3Image_bottom_light from '../assets/MainSection3Image_bottom_light.svg'

const MainSection3 = () => {
  return (
    <Section>
      <Container>
        <ContainerItem>
            <TextContainer><Heading>These days, knowledge is localized, limited, inaccessible, and scarce. As a result, this confines education from expanding its outreach.</Heading></TextContainer>
            <IconContainer><Image src={MainSection3Image_top_light} /></IconContainer>
        </ContainerItem>
        <ContainerItem>
            <IconContainer2><Image src={MainSection3Image_bottom_light} /></IconContainer2>
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
const ContainerItem = styled.div`
display: flex;
flex-direction: row;
width: 95%;
height: 45%;
justify-content: space-between;
align-items: center;
margin: auto 0;
`
const TextContainer = styled.div`
display: flex;
width: 75%;
height: 95%;
justify-content: center;
align-items: center;
`
const IconContainer = styled.div`
display: flex;
flex-direction: column;
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
font-weight: ${props => props.theme.fontBold};
font-size: ${props => props.theme.fontSubheading_large};
display: flex;
`


export default MainSection3
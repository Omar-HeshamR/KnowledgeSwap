import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SuccessImage from '../../assets/MainPageAssets/Section2Assets/SuccessModern.png'
import ProblemFreeImage from '../../assets/MainPageAssets/Section2Assets/ProblemFreeModern.png'

const Section2 = () => {
    return (
        <Section>
            <Container>

                <Div>
                    <ImageDiv><Image src={ProblemFreeImage} alt="Problem Free World"/></ImageDiv>
                    <Subheading>A Problem-Free World</Subheading>
                </Div>

                <Div>
                    <ImageDiv><Image src={SuccessImage} alt="Success"/></ImageDiv>
                    <Subheading>Sustainable Success</Subheading>
                </Div>

            </Container>
        </Section>
    )
}

const Section = styled.div`
display: flex;
height: 40vw;
justify-content: center;
align-items: center;
background: linear-gradient(
    to bottom,
    ${props => props.theme.backgroundColor} 0%,
    ${props => props.theme.backgroundColor}  60.75%,
    ${props => props.theme.textColor} 60.75%,
    ${props => props.theme.textColor} 100%
);

`
const Container = styled.div`
display: flex;
width: 90%;
height: 90%;
justify-content: space-between;
align-items: center;
`
const Div = styled.div`
display: flex;
width: 48%;
height: 90%;
justify-content: space-between;
align-items: center;
flex-direction: column;
`
const ImageDiv = styled.div`
width: 95%;
img{
    width: 100%;
    height: 25vw;
    filter: brightness(50%);
}
`
const Subheading = styled.div`
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
color: ${props => props.theme.backgroundColor};
`
export default Section2
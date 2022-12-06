import React from 'react'
import styled, {keyframes} from 'styled-components';
import { useStateContext } from '../context/StateContext';

const portofolio = () => {
  return (
    <Section>
      <TitleContainer>My Portofolio</TitleContainer>
      <ComingSoon>Coming Soon...</ComingSoon>
    </Section>
  )
}

const Section = styled.section`
height: 100%;
min-height: 30vw;
margin: 2vw 0;
`

const TitleContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.theme.textColor};
font-size: ${props => props.theme.fontTitle_default};
font-weight: ${props => props.theme.fontBold};
`

const ComingSoon = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 6vw;
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
letter-spacing: 0.5vw;
`

const WalletPlease = styled.div`
font-size: ${props => props.theme.fontSubheading_large};
display: flex;
margin-top: 8vw;
margin-bottom: 8vw;
justify-content: center;
align-items: center;
`

export default portofolio
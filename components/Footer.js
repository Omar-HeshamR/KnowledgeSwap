import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Logo from '../assets/KnowledgeSwapLogo.png'
import "@fontsource/red-hat-display"
import DiscordLogo from '../assets/FooterAssets/discord-icon.svg'
import EmailLogo from '../assets/FooterAssets/mail-icon.svg'
import GitHubLogo from '../assets/FooterAssets/github-icon.svg'
import TwitterLogo from '../assets/FooterAssets/twitter-color-icon.svg'
import Account from './Account'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'

const Footer = () => {

  const { accounts, connectAccount, showAccount, setShowAccount } = useStateContext();
  const isConnected = Boolean(accounts[0]);
  const router = useRouter()
  function goToHomePage() {
    router.push("/")
  }

  function ask(){
    if(isConnected){
      router.push("/Ask");
    }else{
      toast.error(" Must Connect Wallet To Ask Questions!")
    }
  }

  function solve(){
    if(isConnected){
      router.push("/Solve");
    }else{
      toast.error(" Must Connect Wallet To Solve Questions!")
    }
  }

  function learn(){
    if(isConnected){
      router.push("/learn");
    }else{
      toast.error(" Must Connect Wallet To Learn!")
    }
  }

  function about(){
    router.push("./about")
  }

  return (
    <Section>
      <Container>
        
        <ThirdDiv>

          <LogoContainer>
            <LogoBox><Image src={Logo} alt="KnowledgeSwap"/></LogoBox>
            <LogoText>KnowledgeSwap</LogoText>
          </LogoContainer>
          <Subheading>Solve Anything and Everything</Subheading>

        </ThirdDiv>

        <ThirdDiv>

          <ButtonBox>
            <ButtonHalf>
              <CTA>Need More Info?</CTA>
              <Button>CONTACT US</Button>
            </ButtonHalf>
            <ButtonHalf>
              <CTA>Want To Support?</CTA>
              <Button>DONATE</Button>
            </ButtonHalf>
          </ButtonBox>

        </ThirdDiv>

        <ThirdDiv>

          <MinorDiv>
            <MinorContainer>
              <IconDiv>
                <Icon><Image src={DiscordLogo} alt="Discord"/></Icon>
                <Icon><Image src={TwitterLogo} alt="Twitter"/></Icon>
                <Icon><Image src={GitHubLogo} alt="GitHub"/></Icon>
                <Icon><Image src={EmailLogo} alt="Email"/></Icon>
              </IconDiv>
            </MinorContainer>
            <MinorContainer>
              {isConnected ? <SmallCTA onClick={() => setShowAccount(true)}>Account</SmallCTA> :
              <SmallCTA onClick={connectAccount}>Connect Wallet</SmallCTA>}
              <SmallCTA onClick={about}>About</SmallCTA>
              <SmallCTA onClick={learn}>Learn</SmallCTA>
              <SmallCTA onClick={solve}>Solve</SmallCTA>
              <SmallCTA onClick={ask}>Ask</SmallCTA>
            </MinorContainer>
          </MinorDiv>

        </ThirdDiv>
          
      </Container>

      {showAccount && < Account /> }
    </Section>
  )
}

const Section = styled.div`
background-color: ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};
display: flex;
width: 100%;
height: 28vh;
justify-content: center;
align-items: center;
`
const Container = styled.div`
display: flex;
width: 95%;
height: 95%;
justify-content: space-between;
align-items: center;
`
const ThirdDiv = styled.div`
display: flex;
width: 33%;
height: 5.5vw;
justify-content: space-between;
align-items: center;
flex-direction: column;
`
const LogoContainer = styled.div`
display: flex;
align-items: center;
flex-direction: row;
`
const LogoBox = styled.div`
display: flex;
margin-right: 0.5vw;
img{
  width: 2vw;
  height: 2.4vw;
}
`
const LogoText = styled.div`
display: flex;
font-size: 2.4vw;
font-weight: ${props => props.theme.fontBold};
`
const Subheading = styled.div`
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
`
const ButtonBox = styled.div`
display: flex;
width: 95%;
height: 100%;
justify-content: space-between;
`
const ButtonHalf = styled.div`
display: flex;
width: 45%;
flex-direction: column;
justify-content: space-between;
align-items: center;
`
const CTA = styled.div`
font-size: ${props => props.theme.fontParagraph_large};
font-weight: ${props => props.theme.fontBold};
`
const Button = styled.div`
border: none;
font-size: ${props => props.theme.fontButton_small};
font-weight: ${props => props.theme.fontBold};
padding: ${props => props.theme.buttonPadding_medium};
background-color: ${props => props.theme.backgroundColor};
color:  ${props => props.theme.textColor};
&:hover{
  cursor: pointer;
}
`
const MinorDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: 100%;   
flex-direction: column;
`
const MinorContainer = styled.div`
display: flex;
`
const SmallCTA = styled.div`
font-size:  ${props => props.theme.fontParagraph_small};
font-weight:  ${props => props.theme.fontBold};
margin: 0 0.5vw;
&:hover{
  cursor: pointer;
  text-decoration: underline;
}
`
const IconDiv = styled.div`
display: flex;
`
const Icon = styled.div`
margin: 0 0.5vw;
img{
  width: 2.75vw;
  height: 2.75vw;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
}
`
export default Footer
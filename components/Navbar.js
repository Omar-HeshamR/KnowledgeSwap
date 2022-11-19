import React, {useState} from 'react'
import styled from 'styled-components'
import Logo from '../assets/KnowledgeSwapLogo.png'
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import "@fontsource/red-hat-display"
import Account from './Account';
import { useRouter } from 'next/router'
import { toast } from "react-hot-toast";

const Navbar = () => {

  const { accounts, connectAccount, showAccount, setShowAccount } = useStateContext();
  const isConnected = Boolean(accounts[0]);
  const router = useRouter()

 

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

  return (
    <Section>
      <MainContainer>
        <LogoContainer><IconContainer><Link  href="/"><Image src={Logo} /></Link></IconContainer>
          <LogoText><Link  href="/">KnowledgeSwap</Link></LogoText>
        </LogoContainer>
        <MenuContainer>
          <MenuItem onClick={learn}>Learn</MenuItem>
          <MenuItem onClick={solve}>Solve</MenuItem>
          <MenuItem onClick={ask}>Ask</MenuItem>
          <MenuItem><Link href="/about">About</Link></MenuItem>
          {isConnected ? <CurrentWallet  onClick={() => setShowAccount(true)}>{accounts[0].substring(0,6)}....{accounts[0].substr(-5)}</CurrentWallet> : <ConnectWalletButton  onClick={connectAccount}>Connect Wallet</ConnectWalletButton>}
        </MenuContainer>
      </MainContainer>
      {showAccount && < Account /> }
    </Section>
  )
}

const Section = styled.div`

display: flex;
background-color:  ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};
height: 6vw;
width: 100%;
justify-content: center;
align-items: center;
z-index: 100;
a{
  text-decoration: none;
  color:  ${props => props.theme.backgroundColor};
  &[aria-current] {
    color:  ${props => props.theme.backgroundColor};
  }
}
`

const MainContainer = styled.div`
display: flex;
height: 90%;
width: 95%;
justify-content: center;
align-items: center;
flex-direciton: row;
`
const LogoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-right: auto;
&:hover{
  cursor: pointer;
  transform: scale(1.05);
}
`
const MenuContainer = styled.div`
display: flex;
height: 90%;
width: 50%;
justify-content: center;
align-items: center;
flex-direction: row;
margin-left: auto;
`
const MenuItem = styled.div`
font-family: "Red Hat Display", sans-serif; 
margin-right: auto;
margin-left: auto;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
&:hover{
  cursor: pointer;
  text-decoration: underline;
}
`
const ConnectWalletButton = styled.button`
display: flex;
background-color: ${props => props.theme.buttonText_color};
color: ${props => props.theme.buttonBackground_color};
margin-left: auto;
font-family: "Red Hat Display", sans-serif; 
font-size:  ${props => props.theme.fontButton_small};
padding: ${props => props.theme.buttonPadding_small};
font-weight: ${props => props.theme.fontBold}

button:focus { outline: none; }
border: none;
&:hover{
  cursor: pointer;
}
`

const CurrentWallet = styled.button`
  display: flex;
  background-color: ${props => props.theme.buttonText_color};
  color: ${props => props.theme.buttonBackground_color};
  margin-left: auto;
  font-family: "Red Hat Display", sans-serif; 
  font-size:  ${props => props.theme.fontButton_small};
  padding: ${props => props.theme.buttonPadding_small};
  font-weight: ${props => props.theme.fontBold}
  button:focus { outline: none; }
  border: none;
  &:hover{
    cursor: pointer;
  }
`

const IconContainer = styled.div`
margin-right: 1vw;
margin-top: auto;
margin-bottom: auto;
display: flex;
img{
  width: 2vw;
  height: 2.4vw;
  &:hover{
    cursor: pointer;
  }
}
`
const LogoText = styled.div`
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
font-family: "Red Hat Display", sans-serif; 
margin-right: auto;
&:hover{
  cursor: pointer;
}
`

export default Navbar

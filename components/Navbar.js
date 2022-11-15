import React from 'react'
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
background-color: #F7F0F5;
height: 8vw;
width: 100%;
justify-content: center;
align-items: center;
z-index: 100;
a{
  text-decoration: none;
  color: #FF0000;
  &[aria-current] {
    color: #FF0000;
  }
}
`
const MainContainer = styled.div`
display: flex;
// background-color: yellow;
height: 90%;
width: 95%;
justify-content: center;
align-items: center;
flex-direciton: row;
`
const LogoContainer = styled.div`
display: flex;
// background-color: green;
height: 90%;
width: 35%;
justify-content: center;
align-items: center;
flex-direction: row;
margin-right: auto;
`
const MenuContainer = styled.div`
display: flex;
// background-color: aqua;
height: 90%;
width: 50%;
justify-content: center;
align-items: center;
flex-direction: row;
margin-left: auto;
`
const MenuItem = styled.div`
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
// background-color: red;
margin-right: auto;
margin-left: auto;
font-size: 2vw;
font-weight: 900;
&:hover{
  cursor: pointer;
  text-decoration: underline;
}
`
const ConnectWalletButton = styled.button`
display: flex;
background-color: #FF0000;
color: #F7F0F5;
margin-left: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: 2vw;
font-weight: 900;
// justify-content: center;
// align-items: center;
padding 0.75vw 1vw;
border: none;
background-color: ff0000;
&:hover{
  cursor: pointer;
}
`

const CurrentWallet = styled.button`
  display: flex;
  background-color: #FF0000;
  color: #F7F0F5;
  margin-left: auto;
  font-family: "Red Hat Display", sans-serif; 
  font-size: 2vw;
  font-weight: 900;
  // justify-content: center;
  // align-items: center;
  padding 0.75vw 1vw;
  border: none;
  background-color: ff0000;
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
  width: 4vw;
  height: 4.8vw;
  &:hover{
    cursor: pointer;
    transform: scale(1.05);
  }
}
`
const LogoText = styled.div`
font-size: 3vw;
font-weight: 900;
// background-color: yellow;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
margin-right: auto;
&:hover{
  cursor: pointer;
  transform: scale(1.05);
}
`

export default Navbar

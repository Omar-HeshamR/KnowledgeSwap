import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/KnowledgeSwapLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useStateContext } from '../../context/StateContext'
import "@fontsource/red-hat-display"
import Account from '../Account'
import { useRouter } from 'next/router'
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

const MovingNavbar = () => {

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
    <Section as={motion.div} variants={Navbar} initial="a" whileInView="b">
      <MainContainer>
        <LogoContainer><IconContainer><Link  href="/"><Image src={Logo} alt="KnowledgeSwap"/></Link></IconContainer>
          <LogoText><Link  href="/">KnowledgeSwap</Link></LogoText>
        </LogoContainer>

        <MenuContainer>

          <MenuItem onClick={learn}> Learn</MenuItem>
          <MenuItem onClick={solve}>Solve</MenuItem>
          <MenuItem onClick={ask}>Ask</MenuItem>
          <MenuItem><Link href="/about">About</Link></MenuItem>
          {isConnected ? <CurrentWallet  onClick={() => setShowAccount(true)}>{accounts[0].substring(0,6)}....{accounts[0].substr(-5)}</CurrentWallet> : <ConnectWalletButton 
           onClick={connectAccount}>Connect Wallet</ConnectWalletButton>}
                
        </MenuContainer>

      </MainContainer>
      {showAccount && < Account /> }
    </Section>
  )
}

const Section = styled.div`
position: fixed;
display: flex;
background-color:  ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};
height: 5vw;
width: 100%;
justify-content: center;
align-items: center;
z-index: 1000;
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
align-items: center;
`
const LogoContainer = styled.div`
display: flex;
&:hover{
  transform: scale(1.05);
  cursor: pointer;
}
`
const MenuContainer = styled.div`
display: flex;
width: 40%;
align-items: center;
margin-left: auto;
`
const MenuItem = styled.div`
font-family: "Red Hat Display", sans-serif; 
margin: 0 auto;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
&:hover{
  cursor: pointer;
  text-decoration: underline;
}
`
const ConnectWalletButton = styled.button`
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
&:hover{
  cursor: pointer;
}
`
const Navbar = {
  a: {
    opacity: 0, height: "6vw",
  },
  b: { 
    opacity: 1,height: "5vw",
    transition: {
      duration: 0.20,
    }
  }
}
// const Navbar = {
//   a: {
//     opacity: 0, height: "6vw",
//   },
//   b: { 
//     opacity: 1,height: "5vw",
//     transition: {
//       duration: 0.20,
//     }
//   }
// }

export default MovingNavbar

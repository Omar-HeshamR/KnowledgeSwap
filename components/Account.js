import React, { useRef, useEffect }  from 'react'
import styled, {keyframes} from 'styled-components';
import {ethers, BigNumber} from "ethers";
import { useStateContext } from '../context/StateContext';
import { AiOutlineLeft } from 'react-icons/ai'; 
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/KnowledgeSwapLogo.png'
import CredibilityIcon from '../assets/CredibilityIcon.png'  

const Account = () => {

const accountRef = useRef();
const modalRef = useRef();

const { accounts, showAccount, setShowAccount, userKStokenCount, userKScredibilityCount, 
  disconnectAccount, onLoad } = useStateContext();

  const closeModal = () => {
      setShowAccount(false);
  };  

useEffect(() => {
  onLoad()
}, [])

  return (
    <AccountWrapper ref={accountRef}>
          <Background onClick={closeModal}  ref={modalRef} />

        <AccountContainer>

        <HeadBack onClick={() => setShowAccount(false)}>
            <AiOutlineLeft size={30} color={"red"}/>
        </HeadBack>
        <InfoBox>
          <InfoContainer> <UserText><p><b>User:</b>{accounts[0]}</p></UserText>
          </InfoContainer>

          <InfoContainer> <InfoText><p><b>KnowledgeSwap Tokens: </b> {userKStokenCount}</p></InfoText>
            <TokenIcon><Image src={Logo} /></TokenIcon>
          </InfoContainer>

          <InfoContainer> <InfoText><p><b>KnowledgeSwap Credibility Token: </b>{userKScredibilityCount}</p></InfoText>
          <CredIcon><Image src={CredibilityIcon} /></CredIcon>
          </InfoContainer>

          <InfoContainer>
            <MyQuestionsHeader onClick={() => setShowAccount(false)}><Link href ="/myquestions">Questions I asked</Link></MyQuestionsHeader>
          </InfoContainer>
          <LogOutButton onClick={disconnectAccount}>LOG OUT</LogOutButton>
        </InfoBox>
            
        </AccountContainer>
    </AccountWrapper>
  )
}

const OpenUp = keyframes`
 0%{
  transform: translatex(35vw)
}
100%{
  transform: translatex(0vw)
}
`
const Background = styled.div`
  width: 65.5vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  position: fixed;
  // background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;

const AccountWrapper = styled.div`
    // background-color: yellow;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
    transition: all 1s ease-in-out;
`
const AccountContainer = styled.div`
    height: 100vh;
    flex-direction: column;
    width: 33.5vw;
    background-color: #F7F0F5;
    // background-color: aqua;
    float: right;
    padding: 40px 10px;
    overflow: auto;
    position: relative;
    animation: ${OpenUp} 1.25s ease;
    @media (max-width: 1024px){
      width: 40vw;
    } 
    @media (max-width: 480px){
      width: 50vw;
    } 
    &::-webkit-scrollbar {
      width: 1vw;
    }
    
    &::-webkit-scrollbar-thumb {
      background: black; 
    }
    
    &::-webkit-scrollbar-button:vertical:increment {
      height: 1vw;
      border-bottom: 0.2vw solid black;
      border-left: 0.2vw solid black;
      border-right: 0.2vw solid black; 
    }
    
    &::-webkit-scrollbar-button:vertical:decrement {
      height: 1vw;
      border-top: 0.2vw solid black;
      border-left: 0.2vw solid black;
      border-right: 0.2vw solid black; 
    }
`
const HeadBack = styled.button`
display: flex;
align-items: center;
font-size: 2vw;
font-weight: 500;
cursor: pointer;
gap: 0px;
margin-left: 0vw;
border: none;
background-color: transparent;

`

const InfoBox = styled.div`
margin-top: 20%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
// min-height: 90%;
height: 60%;
// overflow-y: scroll;
// background-color: blanchedalmond;
`
const InfoContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

width: 90%;
// min-height: 15%;
// height: auto;
height: 15%;
// background-color: coral;
margin: 1vw auto;
`
const LogOutButton = styled.button`
border: none;
font-weight: 900;
font-size: 2vw;
margin-top: 3vw;
background-color: #FF0000;
color: #F7F0F5;
padding: 0.75vw 1.5vw;

&:hover{
  cursor: pointer;
}
`
const MyQuestionsHeader = styled.div`
font-weight: 900;
font-size: 3vw;
color: #FF0000;

&:hover{
  cursor: pointer;
  text-decoration: underline;
}
`
const InfoText = styled.div`
// font-weight: 900;
font-size: 1.5vw;
color: #FF0000;
margin-left: auto;
margin-right: 0.5vw;
// overflow-wrap: break-word;
// background-color: aqua;
text-align: right;
// width: 75%;
// &:hover{
//   cursor: pointer;
//   text-decoration: underline;
// }
`
const TokenIcon = styled.div`
display: flex;
margin-right: auto;
img{

  width: 1.5vw;
  height: 1.8vw;
}
`
const CredIcon = styled.div`
display: flex;
margin-right: auto;
img{

  width: 1.5vw;
  height: 1.5vw;
}
`
const UserText = styled.div`
// font-weight: 900;
font-size: 2vw;
color: #FF0000;
border: 0.25vw double #F37933;
overflow-wrap: break-word;
// background-color: aqua;
text-align: center;
width: 100%;

`

export default Account
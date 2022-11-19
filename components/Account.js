import React, { useRef, useEffect }  from 'react'
import styled, {keyframes} from 'styled-components';
import {ethers, BigNumber} from "ethers";
import { useStateContext } from '../context/StateContext';
import { AiOutlineLeft } from 'react-icons/ai'; 
import Image from 'next/image';
import { useRouter } from 'next/router'
import Logo from '../assets/KnowledgeSwapLogo.png'
import CredibilityIcon from '../assets/CredibilityIcon.png'  

const Account = () => {
const router = useRouter();
const accountRef = useRef();
const modalRef = useRef();

const { accounts, showAccount, setShowAccount, userKStokenCount, userKScredibilityCount, 
  disconnectAccount, onLoad } = useStateContext();

  const closeModal = () => {
      setShowAccount(false);
  };  

  const goToMyQuestion = () => {
    setShowAccount(false)
    router.push("/myquestions")
  }

useEffect(() => {
  onLoad()
}, [])

  return (
    <AccountWrapper ref={accountRef}>
          <Background onClick={closeModal}  ref={modalRef} />

        <AccountContainer>

        <HeadBack onClick={() => setShowAccount(false)}>
            <AiOutlineLeft size={30} color={"#A51C30"}/>
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
            <MyQuestionsHeader onClick={goToMyQuestion}>Questions I asked</MyQuestionsHeader>
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
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.backgroundColor};
    height: 100vh;
    flex-direction: column;
    width: 33.5vw;
    float: right;
    padding: 4vw 1vw;
    overflow: auto;
    position: relative;
    animation: ${OpenUp} 1.25s ease;
    a{
      text-decoration: none;
      color:  ${props => props.theme.backgroundColor};
      &[aria-current] {
        color:  ${props => props.theme.backgroundColor};
    }
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
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontLight};
cursor: pointer;
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
height: 60%;
`
const InfoContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width: 90%;
height: 15%;
margin: 1vw auto;
`
const LogOutButton = styled.button`
border: none;
margin-top: 3vw;
font-size: ${props => props.theme.fontButton_large};
padding: ${props => props.theme.buttonPadding_large};
font-weight: ${props => props.theme.fontBold};
background-color: ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};

&:hover{
  cursor: pointer;
}
`
const MyQuestionsHeader = styled.div`
display: flex;
font-weight: ${props => props.theme.textBold};
font-size: ${props => props.theme.fontSubheading_large};
color: ${props => props.theme.textColor};;

&:hover{
  cursor: pointer;
  text-decoration: underline;
}
`
const InfoText = styled.div`
font-size: ${props => props.theme.fontParagraph_large};
margin-left: auto;
margin-right: 0.5vw;
text-align: right;
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
font-size: ${props => props.theme.fontSubheading_small};
border: 0.2vw solid ${props => props.theme.textColor};
overflow-wrap: break-word;
text-align: center;
width: 100%;

`

export default Account
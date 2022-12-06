import React, { useRef, useEffect }  from 'react'
import styled, {keyframes} from 'styled-components';
import {ethers, BigNumber} from "ethers";
import { useStateContext } from '../context/StateContext';
import { AiOutlineLeft } from 'react-icons/ai'; 
import Image from 'next/image';
import { useRouter } from 'next/router'
import Logo from '../assets/RedLogo.png'
import CredibilityIcon from '../assets/RedCredibilityIcon.png'

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

  const goToMyPortofolio = () => {
    setShowAccount(false)
    router.push("/portofolio")
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
          <InfoContainer> 
            <UserText><p><b>Account:</b>{accounts[0]}</p></UserText>
          </InfoContainer>

          <Grid>
          <GridDiv> <GridText>KnowledgeSwap Tokens:</GridText>
          <TokenCount>{userKStokenCount}<TokenIcon><Image src={Logo} /></TokenIcon></TokenCount>
          </GridDiv>

          <GridDiv> <GridText>Credibility Tokens:</GridText>
          <TokenCount>{userKScredibilityCount}<CredIcon><Image src={CredibilityIcon} /></CredIcon></TokenCount>
          </GridDiv>
          </Grid>

     
            <MyQuestionsHeader onClick={goToMyQuestion}>Questions I Asked</MyQuestionsHeader>
            <MyQuestionsHeader onClick={goToMyPortofolio}>Portfolio Awards</MyQuestionsHeader>

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
const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
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
// margin-top: 20%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 95%;
// background-color: yellow;
`
const InfoContainer = styled.div`
display: flex;
// flex-direction: row;
align-items: center;
justify-content: center;
width: 90%;
// height: 4vw;
margin: auto auto;
// background-color: cyan;
`
const LogOutButton = styled.button`
border: none;
margin: auto auto;
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
// animation: ${bounce} 1s ease infinite;
width: 95%;
height: 10%;
justify-content: center;
align-items: center;
display: flex;
font-weight: ${props => props.theme.textBold};
font-size: ${props => props.theme.fontSubheading_small};
// color: ${props => props.theme.buttonText_color};
// background-color: ${props => props.theme.buttonBackground_color};
// padding:  ${props => props.theme.buttonPadding_small};
border: 0.2vw solid ${props => props.theme.textColor};
margin: 1vw auto;

&:hover{
  cursor: pointer;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.backgroundColor};
}
`

const Grid = styled.div`
display: flex;
flex-direction: column;
// background-color: orangered;
height: 10vw;
width: 90%;
// margin: auto auto;
`

const GridDiv = styled.div`
display: flex;
flex-direction row;
width: 100%;
height: 50%;
// background-color: blue;
justify-content: center;
align-items: center;
`
const GridText = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
// background-color: lightgreen;
margin-right: auto;
font-size: ${props => props.theme.fontParagraph_large};
font-weight: ${props => props.theme.fontBold};
`
const TokenCount = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
// background-color: lightblue;
margin-left: auto;
font-size: ${props => props.theme.fontParagraph_large};
font-weight: ${props => props.theme.fontBold};
`

const TokenIcon = styled.div`
display: flex;
margin-left: 0.5vw;
img{
  width: 1.5vw;
  height: 1.8vw;
}
`
const CredIcon = styled.div`
display: flex;
margin-left: 0.5vw;
img{
  width: 1.5vw;
  height: 1.5vw;
}
`
const UserText = styled.div`
padding:  ${props => props.theme.buttonPadding_small};
font-size: ${props => props.theme.fontParagraph_large};
// border: 0.2vw ${props => props.theme.textColor};
// border-style: solid;
text-align: left;
overflow-wrap: break-word;
border-bottom: 0.5vw double ${props => props.theme.textColor};
width: 100%;
display: -webkit-box;
-webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
-webkit-box-orient: vertical;
`

export default Account
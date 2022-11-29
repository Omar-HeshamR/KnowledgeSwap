import React, {useRef, useEffect}  from 'react'
import styled from 'styled-components'
import Logo from '../../assets/RedLogo.png'
import KSanswerABI from "../../contracts/KSanswerNFT.json"
import Image from 'next/image';
import { toast } from "react-hot-toast";
import { useStateContext } from '../../context/StateContext';
import {ethers, BigNumber} from "ethers";
import { useRouter } from 'next/router'
import KSquestionABI from "../../contracts/KSquestionNFT.json"
import RedLogo from '../../assets/RedLogo.png'
import RegularLogo from '../../assets/KnowledgeSwapLogo.png'


const AsnweringDetails = () => {

  const router = useRouter()
  const { accounts, questionToBeAnswered, setQuestionToBeAnswered, KSanswerNFTContractAddress
  ,  KSquestionNFTContractAddress} = useStateContext();
  const AsnwerRef = useRef();

  async function handleMint(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        KSanswerNFTContractAddress,
        KSanswerABI.abi,
        signer
      );
      try{
        console.log(parseInt(parseFloat(String(questionToBeAnswered[0]))))
        console.log(AsnwerRef.current.value)
        console.log(accounts[0])
        const response = await contract.answerTheQuestion(parseInt(parseFloat(String(questionToBeAnswered[0]))), accounts[0],String(AsnwerRef.current.value));
        router.push("/Solve");
        toast.success("Thank you for answering the question! Best gets rewarded!",   {
            duration: 3000,
          });
    }catch(err){
        toast.error('Error Occured ', err);
      }
  }

  async function VeiwMyQuestions(){
    if(accounts[0]){  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const KSquestionsContract = await new ethers.Contract(
      KSquestionNFTContractAddress,
      KSquestionABI.abi,
      provider
    )
    let response;
    response = await KSquestionsContract.getAllQuestions()
    const Path = String(router.asPath).slice(8)

    let i = 0;
    for(i=0;i<response.length;i++){
      if(String(response[i][0]) === Path){
        setQuestionToBeAnswered(response[i])
      }
    }
    }
  }


  useEffect(() => {
    VeiwMyQuestions()
    setInterval(function() {
      VeiwMyQuestions()
    }, 60000);
  }, [accounts[0]])

  return (
    <>
    <NewSection>
      <NewContainer>
            {accounts[0] ? <>
              {questionToBeAnswered ? 
              <>
                <TextContainer>          
                  <HeaderBox>
                    <TextQuestion>Question:</TextQuestion>
                    <TopicDiv>Topic</TopicDiv>
                    <BountyValue>{String(questionToBeAnswered[3])}<Image src={RedLogo} alt="KS token"/></BountyValue>
                  </HeaderBox>
                  <Title>{String(questionToBeAnswered[2])}</Title>             
                  <Description>test</Description>
                  <Indicator><p><b>Enter your reply:</b> (required)</p></Indicator>
                  <ReplyBox type={"text"} ref={AsnwerRef}/>
                  <ReplyButton onClick={handleMint}>Reply</ReplyButton>
                </TextContainer>
                </>
              : 
              <SubHeading> Loading ...  </SubHeading>}
                </> 
            : <SubHeading>Must Connect Wallet To Reply !</SubHeading>}      
      </NewContainer>
    </NewSection>
    </>
  )
}
const SubHeading = styled.div`
display: flex;
margin-bottom: 5vw;
height: 60vh;
align-items: center;
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`
const NewSection = styled.div`
display: flex;
justify-content: center;
`
const NewContainer = styled.div`
margin-top: 5vw;
display: flex;
align-items: center;
width: 97%;
flex-direction: column;
`
const HeaderBox = styled.div`
display: flex;
height: 4vw;
`
const TextContainer = styled.div`
display: flex;
width: 95%;
flex-direction: column;
`
const Title = styled.text`
text-align: justify;  
min-height: 2.0vw;
font-size: ${props => props.theme.fontParagraph_large};
font-weight: ${props => props.theme.fontBold};
margin-bottom: 0.5vw;
`
const Description = styled.text`
text-align: justify;
font-size: ${props => props.theme.fontParagraph_medium};
min-height: 1.5vw;
margin-bottom: 2vw;
`
const BountyValue = styled.div`
display: flex;
align-items: center;
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');
font-family: 'Poppins', sans-serif;
img{
  margin-left: 0.5vw;
  width: 1.67vw;
  height: 2vw;
}
`
const TextQuestion = styled.div`
font-size: ${props => props.theme.fontSubheading_medium};
font-weight: ${props => props.theme.fontBold};
`
const TopicDiv = styled.div`
display: flex;
background-color: gainsboro;
justify-content: center;
align-items: center;
margin-top: 0.5vw;
margin-right: auto;
margin-left: 1vw;
width: 4vw;
height: 2.5vw;
font-size: ${props => props.theme.fontParagraph_small};
font-weight: ${props => props.theme.fontBold};
`

const Indicator = styled.div`
margin-right: auto;
font-size: ${props => props.theme.fontParagraph_large};
margin-bottom: 0.5vw;
`
const ReplyBox = styled.textarea`
border: 0.15vw solid ${props => props.theme.textColor};
width: 100%;
min-height: 15vw;
font-size: ${props => props.theme.fontParagraph_medium};
color: ${props => props.theme.textColor};
padding: 0.5vw 0.5vw 0.5vw 0.5vw;
`
const ReplyButton = styled.button`
color: ${props => props.theme.backgroundColor};
background-color: ${props => props.theme.textColor};
font-weight: ${props => props.theme.fontBold};
border: none;
font-size: 5vw;
width: 100%;
height: 8vw;
margin: 2vw 0;
&:hover{
  cursor: pointer;
  transform: scale(0.95);
}
`

export default AsnweringDetails
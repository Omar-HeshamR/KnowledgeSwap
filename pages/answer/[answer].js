import React, {useRef, useEffect, useState}  from 'react'
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
  ,  KSquestionNFTContractAddress, makeReplyJson, makeFileObjects, storeFiles} = useStateContext();
  const AsnwerRef = useRef();
  const [loading, setLoading] = useState();

  async function postReply(){

    setLoading(true)

    // create the reply object
    const _questionID = String(router.asPath).slice(8)
    const _replier = accounts[0];
    const _reply = AsnwerRef.current.value;
    const replyObject = makeReplyJson(_questionID, _replier, _reply);

    // Upload to IPFS
    let CID;
    try{
    const files = makeFileObjects(replyObject, "reply");
    CID = await storeFiles(files);
    }catch(err){
      toast.error(`Failed to upload your reply!`)
      setLoading(false)
      return;
    }

    // Interacting with the blockchain
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        KSanswerNFTContractAddress,
        KSanswerABI.abi,
        signer
    );
    const response = await contract.answerTheQuestion( CID, _questionID, replyObject.replyID );
    router.push("/Solve");
    toast.success("Thank you for answering the question! Best gets rewarded!",   {
        duration: 3000,});}
    catch(err){
        toast.error('Signing Canclled');
        setLoading(false)
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
      const TokenURI = `https://${response[i]}.ipfs.w3s.link/question.json`;
      const tokenURIResponse = await fetch(TokenURI)
        .then(res => res.json())
        .then(data => { return data})
      if(tokenURIResponse.questionID == Path){
        setQuestionToBeAnswered(tokenURIResponse)
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
                    <TopicDiv>{questionToBeAnswered.topic}</TopicDiv>
                    <BountyValue>{questionToBeAnswered.bounty}<Image src={RedLogo} alt="KS token"/></BountyValue>
                  </HeaderBox>
                  <Title>{questionToBeAnswered.title}</Title>             
                  <Description>{questionToBeAnswered.description}</Description>
                  <Indicator><p><b>Enter your reply:</b> (required)</p></Indicator>
                  <ReplyBox type={"text"} ref={AsnwerRef}/>
                  {loading ? <Signing> Signing ...  </Signing>
                  :<ReplyButton onClick={postReply}>Reply</ReplyButton>}
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
const Signing = styled.div`
display: flex;
align-items: center;
justify-content: center;
align-items: center;
margin-top: 2vw;
margin-bottom: 2vw;
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`

const NewSection = styled.div`
display: flex;
justify-content: center;
`
const NewContainer = styled.div`
margin-top: 2vw;
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
padding-left: 1vw;
padding-right: 1vw;
width: auto;
height: 2.25vw;
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
margin-top: 2vw;
margin-bottom: 5vw;
&:hover{
  cursor: pointer;
  transform: scale(0.95);
}
`

export default AsnweringDetails
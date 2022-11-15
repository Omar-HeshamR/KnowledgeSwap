import React, {useRef, useEffect}  from 'react'
import styled from 'styled-components'
import Logo from '../../assets/KnowledgeSwapLogo.png'
import KSanswerABI from "../../contracts/KSanswerNFT.json"
import Image from 'next/image';
import { toast } from "react-hot-toast";
import { useStateContext } from '../../context/StateContext';
import {ethers, BigNumber} from "ethers";
import { useRouter } from 'next/router'
import KSquestionABI from "../../contracts/KSquestionNFT.json"

const KSanswerNFTContractAddress = "0xf27DEcD2065C30588197b68A5Bf02c785832829F"
const KSquestionNFTContractAddress = "0xb31db8a34Faa173df8Bc62e103827AFB00045FDF"

const AsnweringDetails = () => {

  const router = useRouter()
  const { accounts, questionToBeAnswered, setQuestionToBeAnswered } = useStateContext();
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
    <Section>
        <Heading>Answer A Question</Heading>
            {accounts[0] ? <>
              {questionToBeAnswered ? 
              <>
            <QuestionDiv>
                <QuestionBox>
                  <MinorContainer>
                    <SubHeading >Question:</SubHeading>
                    <BountyContainer>
                      <Bounty><p>Question Bounty: <b>{String(questionToBeAnswered[3])}</b></p></Bounty>
                      <BountyIcon><Image src={Logo} alt="KS token"/></BountyIcon>
                    </BountyContainer>
                  </MinorContainer>
                  <Inquiry>{String(questionToBeAnswered[2])}</Inquiry>
                </QuestionBox>
              </QuestionDiv> 
                <YourReply>Your Reply:</YourReply>
                <QuestionInput type={"text"} ref={AsnwerRef}/>
                <MintButton onClick={handleMint}>Reply</MintButton>
                </>
              : 
              <SubHeading> Loading ...  </SubHeading>}
                </> 
            : <SubHeading>Must Connect Wallet To Reply !</SubHeading>}

    </Section>
  )
}

const Section = styled.section`
display: flex;
width: 100%;
min-height: 50vw;
height: 100%;
background-color: #F7F0F5;
// justify-content: center;
align-items: center;
flex-direction: column;
text-align: center;
// background-color: darkcyan;
`
const Heading = styled.div`
color: #FF0000;
margin-top: 5.5vw;
margin-bottom: 3vw;
font-family: "Red Hat Display", sans-serif; 
font-size: 4vw;
font-weight: 900;
`
const QuestionDiv = styled.div`
margin: 1vw 0;
width: 95%;
min-height: 18vw;
height: auto;
display: flex;
// flex-direction: column;
// background-color: purple;
border-radius: 1vw;
border: 0.5vw double red;
justify-content: center;
align-items: center;
`
const QuestionBox = styled.div`
width: 95%;
height: 100%;
margin: 1vw 0;
// background-color: blanchedalmond;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const BountyContainer = styled.div`
width: 30%;
height: 4vw;
flex-direction: row;
display: flex;
// background-color: orange;
margin-bottom: auto;
margin-left: auto;
justify-content: center;
align-items: center;
`
const Bounty = styled.div`
font-size: 1.5vw;
font-weight: 100;
display: flex;
color: #FF0000;
`
const BountyIcon = styled.div`
display: flex;
margin-left: 0.5vw;
img{
  width: 1.5vw;
  height: 1.8vw;
}
`
const MinorContainer = styled.div`
height: 4vw;
width: 100%;
display: flex;
// background: blue;
flex-direction: row;
`
const SubHeading = styled.div`
display: flex;
width: 50%;
align-items: center;
font-size: 4vw;
font-weight: 900;
color: #FF0000;
// background-color: ivory;
`
const YourReply = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
font-size: 4vw;
font-weight: 900;
color: #FF0000;
margin-bottom: 1vw;
// background-color: ivory;
`

const Inquiry = styled.div`
width: 100%;
// min-height: 4vw;
height: 100%;
max-height: 30vw;
overflow-y: scroll;
margin-top: 1vw;
margin-bottom: auto;
display: flex;
// justify-content: center;
// align-items: center;
text-align: left;
// background-color: orangered;
color: #FF0000;

&::-webkit-scrollbar {
  width: 1vw;
}

&::-webkit-scrollbar-thumb {
  background: red; 
}

`
const QuestionInput = styled.textarea`
border: 1px solid red;
width: 95%;
min-height: 10vw;
height: 100%:
font-size: 1.25vw;
font-weight: 600;
margin-bottom: 3vw;
color: red;
padding-top: 1vw;
padding-left: 1vw;
`
const MintButton = styled.button`
display: flex;
background-color: #FF0000;
color: #F7F0F5;
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: 2.25vw;
font-weight: 900;
margin-bottom: 3vw;
padding 0.75vw 1vw;
border: none;
background-color: ff0000;
&:hover{
    border: 5px solid #6610F2;
    transform: scale(1.05);
    cursor: pointer;
}
`

const RefreshButton = styled.button`
display: flex;
background-color: #FF0000;
color: #F7F0F5;
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: 2.25vw;
font-weight: 900;
margin-bottom: 3vw;
padding 0.75vw 1vw;
border: none;
background-color: ff0000;
&:hover{
    border: 5px solid #6610F2;
    transform: scale(1.05);
    cursor: pointer;
}
`

export default AsnweringDetails
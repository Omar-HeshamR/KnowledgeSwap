import React, {useRef, useState, useEffect}  from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/StateContext';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
import KSquestionABI from "../contracts/KSquestionNFT.json"
import Logo from '../assets/KnowledgeSwapLogo.png'
import {ethers, BigNumber} from "ethers";

const Ask = () => {

  const QuestionRef = useRef();
  const BountyRef = useRef();
  const router = useRouter()
  const { accounts, userKStokenCount, onLoad, HoldBounty , KSquestionNFTContractAddress, 
    Test} = useStateContext();
  const [loading, setLoading] = useState(false);
  const [checker, setChecker] = useState();
  
  useEffect(() => {
      onLoad()
  }, [accounts[0]])

  async function handleMint(){
    // console.log(userKStokenCount)
    // console.log(BountyRef.current.value)
    if(BountyRef.current.value < 0){toast.error("Bounty cant be below 0, LOL.")}else{
      if(parseInt(userKStokenCount) < parseInt(BountyRef.current.value)){
        toast.error("Not Enough KnowledgeSwap Tokens")
      }else{  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          KSquestionNFTContractAddress,
          KSquestionABI.abi,
          signer
        );
        try{
          var currentDateTime = new Date();
          const timeStamp = currentDateTime.getTime() / 1000;
          // console.log("account: ", accounts[0])
          // console.log("Question: ", QuestionRef.current.value)
          // console.log("Bounty: ", BountyRef.current.value)
          // console.log("timeStamp: ", timeStamp)

          // get the question ID
          const myQuestionID = await contract.getQuestionID(accounts[0],QuestionRef.current.value) 

          setLoading(true)

          // Mint the question
          try{
          const response = await contract.AskMyQuestion(accounts[0],QuestionRef.current.value,
          BountyRef.current.value, String(timeStamp));
          HoldBounty(String(parseInt(myQuestionID)),String(parseInt(BountyRef.current.value)))

          // setChecker(response);
          // while(checker == undefined){}

          // console.log(response)
        }catch(err){
            toast.error("Cancelled!")
            router.push("/");
          }

          // setTimeout(async function () {
          //   setChecker(undefined)
          //   console.log(checker)
          //   }, 3000)

          // let i = 0;
          // while(checker === undefined){
          //   console.log("mistake")
          //   if(i >= 1000){router.push("/about")}
          //   i++;
          // }
          // OLD METHOD
          // setTimeout(async function () {
            // console.log(String(response2[response2.length-1][1]))
            // console.log(String(response2[response2.length-1][2]))
            // console.log(accounts[0])
            // console.log(String(QuestionRef.current.value))
            // console.log(String(response2[response2.length-1][1]) !== String(accounts[0]))
            // console.log(String(response2[response2.length-1][2]) !== String(QuestionRef.current.value))
          //   while(String(response2[response2.length-1][1]) != accounts[0] ||
          //     String(response2[response2.length-1][2]) != QuestionRef.current.value ){
          //      response2 = await contract.getAllQuestions()
          //       if(String(response2[response2.length-1][1]) === String(accounts[0]) &&
          //       String(response2[response2.length-1][2]) === String(QuestionRef.current.value) ){
          //         console.log("OUT")
          //         break;
          //       }
          //       console.log("still fetching...")
          //     }
          //     setTimeout(function(){
          //       HoldBounty(parseInt(response2[response2.length -1][0]),parseInt(BountyRef.current.value))
          //     }, 1500)    
          // // setLoading(false)
          //   }, 2000)

        }catch (err) {
              toast.error('Error Occured ', err);
            }
      }
    }
  }

  return (
    <>
{/* <Section>
  <Heading onClick={Test}>Ask A Question:</Heading>
  {accounts[0] 
  ? <>{userKStokenCount > 300 
    ? <>
          <InputContainer>
            <InputText>Question: </InputText>
            <QuestionInput  type={"text"} ref={QuestionRef}/>
          </InputContainer>

          <InputContainer>
          {/* <SubHeading>How much do you want to reward the solver?</SubHeading> */}
          {/* <InputText>Bounty: </InputText>
            <Input  type={"number"} ref={BountyRef} defaultValue="1"/>
          </InputContainer>
          {loading ? <PleaseWait>Signing Transaction... </PleaseWait>:  
          <MintButton onClick={handleMint} >Submit Question !</MintButton>}
      </> 
    : <><Heading2>Must Hold a minimum of 300 Tokens To Ask Questions!</Heading2>
    </>}</>
  : <Heading> Please Connect Wallet first !</Heading>}
</Section> */}

    <NewSection>
      <MainDiv>
        {accounts[0] 
        ? <>{userKStokenCount > 300 
          ? <>
          <Indicator><p><b>Enter Title: </b>(required)</p></Indicator>
          <TitleInput type={"text"} ref={QuestionRef}/>
          <Indicator><p><b>Enter Topic and/or Keyword: </b>(required)</p> </Indicator>
          <MinorInput />
          <Indicator><p><b>Enter Description: </b>(optional)</p></Indicator>
          <DescInput />
          <Indicator><p><b>Set Bounty: </b>(Enter any value including 0; make sure to adjust it based on your desired engagement level)</p></Indicator>
          <MinorInput  type={"number"} ref={BountyRef} defaultValue="1"/>
                {loading ? <PleaseWait>Signing Transaction... </PleaseWait>:  
                <AskButton onClick={handleMint} >Ask</AskButton>}
            </> 
          : <><Heading2>Must Hold a Minimum of 300 Tokens to Ask Questions!</Heading2>
          </>}</>
        : <Heading> Please Connect Wallet First !</Heading>}
      </MainDiv>
    </NewSection>
    </>
  )
}
const Heading = styled.div`
height: 60vh;
display: flex;
align-items: center;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`
const Heading2 = styled.div`
height: 60vh;
display: flex;
align-items: center;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
`
const PleaseWait = styled.div`
font-size: ${props => props.theme.fontHeading_large};
font-weight: ${props => props.theme.fontBold};
margin-bottom: 2vw;
margin-top: 0vw;
`
const NewSection = styled.div`
`
const MainDiv = styled.div` 
display: flex;
margin: 5vw auto;
width: 80%;
height: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
`
const MinorInput = styled.input`
border: 0.15vw solid  ${props => props.theme.textColor};
width: 90%;
height: 2.5vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color:  ${props => props.theme.textColor};
padding-left: 0.5vw;
`
const TitleInput = styled.textarea`
border: 0.15vw solid  ${props => props.theme.textColor};
width: 90%;
height: 4vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color:  ${props => props.theme.textColor};
`
const DescInput = styled.textarea`
border: 0.15vw solid  ${props => props.theme.textColor};
width: 90%;
height: 12vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color:  ${props => props.theme.textColor};
`
const Indicator = styled.div`
font-size: ${props => props.theme.fontParagraph_medium};
margin: 1vw auto 0.5vw 5%;
`
const AskButton = styled.button`
color: ${props => props.theme.backgroundColor};
background-color: ${props => props.theme.textColor};
justify-content: center;
align-items: center;
font-weight: ${props => props.theme.fontBold};
border: none;
font-size: 5vw;
width: 90%;
height: 8vw;
margin: 2vw 0;
&:hover{
  cursor: pointer;
  transform: scale(0.95);
}
`


const Section = styled.section`
display: flex;
width: 100%;
height: 40vw;
align-items: center;
flex-direction: column;
text-align: center;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
// const Heading = styled.div`
// margin-top: 1.5vw;
// margin-bottom: 3vw;
// font-family: "Red Hat Display", sans-serif; 
// font-size: ${props => props.theme.fontHeading_small};
// font-weight: ${props => props.theme.fontBold};
// `
// const Heading2 = styled.div`
// margin-top: 5.5vw;
// margin-bottom: 3vw;
// font-family: "Red Hat Display", sans-serif; 
// font-size: ${props => props.theme.fontSubheading_small};
// font-weight: ${props => props.theme.fontBold};
// `

const SubHeading = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
margin-right: 1vw;
font-family: "Red Hat Display", sans-serif; 
font-weight: ${props => props.theme.fontLight};
font-size: ${props => props.theme.fontParagraph_medium};
`
const InputContainer = styled.div`
margin-top: 1vw;
margin-bottom: 2.5vw;
display: flex;
flex-direction: row;
`
const QuestionInput = styled.textarea`
border: 0.15vw solid ${props => props.theme.textColor};
width: 50vw;
height: 10vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color:  ${props => props.theme.textColor};
padding-top: 1vw;
padding-left: 1vw;
`

const Input = styled.input`
border: 0.15vw solid  ${props => props.theme.textColor};
width: 5vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color: ${props => props.theme.textColor};
padding-left: 0.5vw;
`

const InputText = styled.div`
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontSubheading_medium};
font-weight: ${props => props.theme.fontLight};
margin-right: 4vw;
`

const MintButton = styled.button`
display: flex;
background-color: ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontButton_large};
font-weight: ${props => props.themefontBold};
padding ${props => props.theme.buttonPadding_large};
border: none;
&:hover{
    border: 0.4vw solid #6610F2;
    transform: scale(1.05);
    cursor: pointer;
}
`

// const PleaseWait = styled.div`
// font-size: ${props => props.theme.fontHeading_large};
// font-weight: ${props => props.theme.fontBold};
// margin-bottom: 2vw;
// margin-top: 0vw;
// `

export default Ask
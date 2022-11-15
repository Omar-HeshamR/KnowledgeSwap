import React, {useRef, useState, useEffect}  from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/StateContext';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
import KSquestionABI from "../contracts/KSquestionNFT.json"
import Logo from '../assets/KnowledgeSwapLogo.png'
import {ethers, BigNumber} from "ethers";

const KSquestionNFTContractAddress = "0xb31db8a34Faa173df8Bc62e103827AFB00045FDF"

const Ask = () => {

  const QuestionRef = useRef();
  const BountyRef = useRef();
  const router = useRouter()
  const { accounts, userKStokenCount, onLoad, HoldBounty , Test} = useStateContext();
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
    <Section>
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
              <InputText>Bounty: </InputText>
                <Input  type={"number"} ref={BountyRef} defaultValue="1"/>
              </InputContainer>
              {loading ? <PleaseWait>Signing Transaction... </PleaseWait>:  
              <MintButton onClick={handleMint} >Submit Question !</MintButton>}
          </> 
        : <><Heading2>Must Hold a minimum of 300 Tokens To Ask Questions!</Heading2>
        </>}</>
      : <Heading> Please Connect Wallet first !</Heading>}
    </Section>
  )
}

const Section = styled.section`
display: flex;
width: 100%;
height: 40vw;
background-color: #F7F0F5;
// justify-content: center;
align-items: center;
flex-direction: column;
text-align: center;
// background-color: darkcyan;
`
const Heading = styled.div`
color: #FF0000;
margin-top: 1.5vw;
margin-bottom: 3vw;
font-family: "Red Hat Display", sans-serif; 
font-size: 4vw;
font-weight: 900;
`
const Heading2 = styled.div`
color: #FF0000;
margin-top: 5.5vw;
margin-bottom: 3vw;
font-family: "Red Hat Display", sans-serif; 
font-size: 3vw;
font-weight: 900;
`

const SubHeading = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
margin-right: 1vw;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-weight: 100;
font-size: 1.25vw;
`
const InputContainer = styled.div`
margin-top: 1vw;
margin-bottom: 2.5vw;
display: flex;
flex-direction: row;
`
const QuestionInput = styled.textarea`
border: 1px solid red;
width: 50vw;
height: 10vw;
font-size: 1.25vw;
font-weight: 600;
color: red;
padding-top: 1vw;
padding-left: 1vw;
`

const Input = styled.input`
border: 1px solid red;
width: 5vw;
font-size: 1.25vw;
font-weight: 600;
color: red;
padding-left: 0.5vw;
`

const InputText = styled.div`
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-size: 2.25vw;
font-weight: 600;
margin-right: 4vw;
`

const MintButton = styled.button`
display: flex;
background-color: #FF0000;
color: #F7F0F5;
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: 2.25vw;
font-weight: 900;
padding 0.75vw 1vw;
border: none;
background-color: ff0000;
&:hover{
    border: 5px solid #6610F2;
    transform: scale(1.05);
    cursor: pointer;
}
`

const PleaseWait = styled.div`
color: #FF0000;
font-size: 5vw;
font-weight: 550;
margin-bottom: 2vw;
margin-top: 0vw;
`

export default Ask
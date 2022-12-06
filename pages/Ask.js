import React, {useRef, useState, useEffect}  from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/StateContext';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
import KSquestionABI from "../contracts/KSquestionNFT.json"
import Logo from '../assets/KnowledgeSwapLogo.png'
import {ethers, BigNumber} from "ethers";

const Ask = () => {

  const TitleRef = useRef();
  const TopicRef = useRef();
  const DescriptionRef = useRef();
  const BountyRef = useRef();
  const router = useRouter()
  const { accounts, userKStokenCount, onLoad, HoldBounty , KSquestionNFTContractAddress, 
    makeQuestionJson, makeFileObjects, storeFiles } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [checker, setChecker] = useState();
  
  useEffect(() => {
      onLoad()
  }, [accounts[0]])

  async function handleMint(){
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
        }catch (err) {
              toast.error('Error Occured ', err);
            }
      }
    }
  }

  async function AskQuestion(){

    // Condtions of Approval
    if(TitleRef.current.value === undefined){
      toast.error("Must Include Title"); return;
    }
    if(TopicRef.current.value === undefined){
      toast.error("Must Pick a Topic"); return;
    }
    if(BountyRef.current.value <= -1){
      toast.error("Bounty cannot be negative!"); return;
    }
    if(DescriptionRef.current.value === undefined){
      DescriptionRef.current.value = ""
    }
    if(parseInt(userKStokenCount) < parseInt(BountyRef.current.value)){
        toast.error("Not Enough KnowledgeSwap Tokens"); return;
    }

    setLoading(true)

    // creating the question object
    const _asker = accounts[0];
    const _title = TitleRef.current.value;
    const _topic = TopicRef.current.value;
    const _description = DescriptionRef.current.value;
    const _bounty = BountyRef.current.value;
    const questionObj = makeQuestionJson(_asker, _title, _topic, _description, _bounty);

    // Uploading to IPFS
    let CID;
    try{
    const files = makeFileObjects(questionObj, "question");
    CID = await storeFiles(files);
    }catch(err){
      toast.error(`Failed to upload your question!`)
      return;
    }

    // Interacting with the blockchain
    let response;
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        KSquestionNFTContractAddress,
        KSquestionABI.abi,
        signer
      );

      response = await contract.AskMyQuestion(CID);
      HoldBounty(questionObj.questionID,questionObj.bounty);

    }catch(err){
      toast.error(`Failed to proccess your question!`)
      return;
    }
  }

  return (
    <>
    <NewSection>
      <MainDiv>
        {accounts[0] 
        ? <>{userKStokenCount > 300 
          ? <>

          <TitleContainer>Post Inquiry</TitleContainer>

          <Indicator><p><b>Enter Title: </b>(required)</p></Indicator>
          <TitleInput type={"text"} ref={TitleRef}/>
          <Indicator><p><b>Enter Topic and/or Keyword: </b>(required, limited to one)</p> </Indicator>
          <MinorInput type={"text"} ref={TopicRef}/>
          <Indicator><p><b>Enter Description: </b>(optional)</p></Indicator>
          <DescInput  type={"text"} ref={DescriptionRef}/>
          <Indicator><p><b>Set Bounty: </b>(Enter any value including 0; make sure to adjust it based on your desired engagement level)</p></Indicator>
          <MinorInput  type={"number"} ref={BountyRef} defaultValue="1"/>
                {loading ? <PleaseWait>Signing Transaction... </PleaseWait>:  
                <AskButton onClick={AskQuestion} >Ask</AskButton>}
            </> 
          : <><Heading2>Must Hold a Minimum of 300 Tokens to Ask Questions!</Heading2>
          </>}</>
        : <Heading> Please Connect Wallet First !</Heading>}
      </MainDiv>
    </NewSection>
    </>
  )
}

const TitleContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.theme.textColor};
font-size: ${props => props.theme.fontTitle_default};
font-weight: ${props => props.theme.fontBold};
`

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
margin: 2vw auto;
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
color: black;
padding-left: 0.5vw;
`
const TitleInput = styled.textarea`
border: 0.15vw solid  ${props => props.theme.textColor};
width: 90%;
height: 4vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color: black;
padding-left: 0.5vw;
padding-top: 0.5vw;
`
const DescInput = styled.textarea`
border: 0.15vw solid  ${props => props.theme.textColor};
width: 90%;
height: 12vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
color: black;
padding-left: 0.5vw;
padding-top: 0.5vw;
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
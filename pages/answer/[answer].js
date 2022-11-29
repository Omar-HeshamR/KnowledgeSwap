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
                  <Description>Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. </Description>
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
{/* <NewSection>
<NewContainer>
  <BountyValue>200 <Image src={RedLogo}/></BountyValue>
  <TextContainer>
    <HeaderBox>
      <TextQuestion>Question:</TextQuestion>
      <TopicDiv>Topic</TopicDiv>
      <BountyValue>200<Image src={RedLogo}/></BountyValue>
    </HeaderBox>
    <Title>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Title>
    <Description>Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. </Description>
    <Indicator><p><b>Enter your reply:</b> (required)</p></Indicator>
    <ReplyBox></ReplyBox> 
    <ReplyButton>Reply</ReplyButton>
  </TextContainer>
</NewContainer>
</NewSection> */}
{/* <Section>
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

</Section> */}
// const QuestionInput = styled.textarea`
// // border: 1px solid ${props => props.theme.textColor};;
// // width: 95%;
// // min-height: 10vw;
// // height: 100%:
// // font-size: 1.25vw;
// // font-weight: 600;
// // margin-bottom: 3vw;
// // color: red;
// // padding-top: 1vw;
// // padding-left: 1vw;
// // `
// const MintButton = styled.button`
// display: flex;
// background-color: ${props => props.theme.textColor};;
// color: #F7F0F5;
// margin-bottom: auto;
// font-family: "Red Hat Display", sans-serif; 
// font-size: 2.25vw;
// font-weight: 900;
// margin-bottom: 3vw;
// padding 0.75vw 1vw;
// border: none;
// background-color: ff0000;
// &:hover{
//     border: 5px solid #6610F2;
//     transform: scale(1.05);
//     cursor: pointer;
// }
// `
// const RefreshButton = styled.button`
// display: flex;
// background-color: #FF0000;
// color: #F7F0F5;
// margin-bottom: auto;
// font-family: "Red Hat Display", sans-serif; 
// font-size: 2.25vw;
// font-weight: 900;
// margin-bottom: 3vw;
// padding 0.75vw 1vw;
// border: none;
// background-color: ff0000;
// &:hover{
//     border: 5px solid #6610F2;
//     transform: scale(1.05);
//     cursor: pointer;
// }
// `
// const YourReply = styled.div`
// display: flex;
// justify-content: center;
// text-align: center;
// align-items: center;
// font-size: 4vw;
// font-weight: 900;
// margin-bottom: 1vw;
// // background-color: ivory;
// `
// const Inquiry = styled.div`
// width: 100%;
// // min-height: 4vw;
// height: 100%;
// max-height: 30vw;
// overflow-y: scroll;
// margin-top: 1vw;
// font-size: 2vw;
// margin-bottom: auto;
// display: flex;
// // justify-content: center;
// // align-items: center;
// text-align: left;
// // background-color: orangered;

// &::-webkit-scrollbar {
//   width: 1vw;
// }

// &::-webkit-scrollbar-thumb {
//   background: red; 
// }

// `
// const Section = styled.section`
// // display: flex;
// // width: 100%;
// // min-height: 50vw;
// // height: 100%;
// // background-color: #F7F0F5;
// // color: ${props => props.theme.textColor};
// // // justify-content: center;
// // align-items: center;
// // flex-direction: column;
// // text-align: center;
// // // background-color: darkcyan;
// // `
// const Heading = styled.div`
// margin-top: 5.5vw;
// margin-bottom: 3vw;
// font-family: "Red Hat Display", sans-serif; 
// font-size: 4vw;
// font-weight: 900;
// `
// const QuestionDiv = styled.div`
// margin: 1vw 0;
// width: 95%;
// min-height: 18vw;
// height: auto;
// display: flex;
// // flex-direction: column;
// // background-color: purple;
// border-radius: 1vw;
// border: 0.5vw double ${props => props.theme.textColor};
// justify-content: center;
// align-items: center;
// `
// const QuestionBox = styled.div`
// width: 95%;
// height: 100%;
// margin: 1vw 0;
// // background-color: blanchedalmond;
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// `
// const BountyContainer = styled.div`
// width: 30%;
// height: 4vw;
// flex-direction: row;
// display: flex;
// // background-color: orange;
// margin-bottom: auto;
// margin-left: auto;
// justify-content: center;
// align-items: center;
// `
// const Bounty = styled.div`
// font-size: 1.5vw;
// font-weight: 100;
// display: flex;
// `
// const BountyIcon = styled.div`
// display: flex;
// margin-left: 0.5vw;
// img{
//   width: 1.5vw;
//   height: 1.8vw;
// }
// `
// const MinorContainer = styled.div`
// height: 4vw;
// width: 100%;
// display: flex;
// // background: blue;
// flex-direction: row;
// `
export default AsnweringDetails
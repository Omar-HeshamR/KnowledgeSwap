import React, {useState, useRef, useEffect} from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import { useStateContext } from '../context/StateContext';
import SearchIcon from '../assets/SearchIcon.png'
import { useRouter } from 'next/router'
import Logo from '../assets/KnowledgeSwapLogo.png'
import KSquestionABI from "../contracts/KSquestionNFT.json"
import {ethers, BigNumber} from "ethers";

const KSquestionNFTContractAddress = "0xb31db8a34Faa173df8Bc62e103827AFB00045FDF"

const Solve = () => {

  const SearchRef = useRef()
  const router = useRouter()
  const { accounts, questionToBeAnswered, setQuestionToBeAnswered} = useStateContext();
  const [searchInput, setSearchInput] = useState("");
  const [ totalQuestions, setTotalQuestions] = useState([]);
  const [ questions, setQuestions] = useState([]);

  function goToQuestionReply(question){
    setQuestionToBeAnswered(question)
    router.push(`./answer/${question[0]}`);
  }

  async function VeiwAllQuestions(){
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

    setQuestions(response);
    setTotalQuestions(response);

    // console.log(questions[0][2]);
    }
  }

  function searchedFor(questionText, string){
    return Boolean(String(questionText.toLowerCase()).indexOf(string.toLowerCase()) >= 0)
  }

  useEffect(() => {
    VeiwAllQuestions()
    setInterval(function() {
      VeiwAllQuestions()
      // if(SearchRef.current.value.length > 1) {
      //   let newQuestions = [];
      //   let i = 0;
      //   for(i=0;i<questions.length;i++){
      //     if(searchedFor(questions[i][2],SearchRef.current.value)){
      //       newQuestions.push(questions[i])
      //     }
      //   }
      //   setQuestions(newQuestions) 
      // }else{
      //   // setInterval(function() {
      //     // VeiwAllQuestions()
      //   // }, 3000); // 60000
      // }      
    }, 60000);
  }, [accounts[0]])

  function Search(searchTerm){
    if(searchTerm.length > 1){
      let newQuestions = [];
        let i = 0;
        for(i=0;i<totalQuestions.length;i++){
          if(searchedFor(totalQuestions[i][2],searchTerm)){
            newQuestions.push(totalQuestions[i])
          }
        }
        setQuestions(newQuestions) 
    }else{
      setQuestions(totalQuestions) 
    }
  }

  return (
    <Section>
      <Container> <Title>Solve a Question</Title>
      <SearchContainer>
        <SearchBox type="text" ref={SearchRef} />
        <IconContainer onClick={() => Search(SearchRef.current.value)}><Image src={SearchIcon} /></IconContainer>
      </SearchContainer>
      
      {accounts[0] ? <></> : 
      <WalletPlease>Please Connect Wallet</WalletPlease>}

      <QuestionContainer>
        {[...questions].reverse()?.map((question) => 
                <QuestionDiv key={question.id}>
                <QuestionBox>
                  <MinorContainer>
                    <SubHeading>Question:</SubHeading>
                    <BountyContainer>
                      <Bounty><p>Bounty: <b>{String(question[3])}</b></p></Bounty>
                      <BountyIcon><Image src={Logo} alt="KS token"/></BountyIcon>
                    </BountyContainer>
                  </MinorContainer>
                  <Inquiry>{String(question[2])}</Inquiry>
                    <SolveButton onClick={() => goToQuestionReply(question)}>Solve</SolveButton>
                </QuestionBox>
              </QuestionDiv>
        )}

      </QuestionContainer>
      </Container>
    </Section>
  )
}

const Section = styled.section`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
// background-color: chocolate;
background-color: #F7F0F5;
`
const Container = styled.div`
width: 60%;
height: 90%;
display: flex;
align-items: center;
justify-content: center;
// background-color: ivory;
flex-direction: column;
`
const Title = styled.div`
width: 95%;
margin: 1vw 0;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
color: #FF0000;
font-size: 6vw;
font-weight: 900;
// background-color: yellow;
`
const SearchContainer = styled.div`
margin: 1vw 0;
width: 95%;
height: 4vw;
display: flex;
align-items: center;
// justify-content: center;
// background-color: lightsteelblue;
flex-direction: row;
`
const WalletPlease = styled.div`
font-size: 3.25vw;
color: #FF0000;
`

const SearchBox = styled.input`
margin-left: 2.5%;
border: 0.1vw solid red;
display: flex;
width: 90%;
height: 90%;
background-color: #F7F0F5;
color: #FF0000;
font-size: 2vw;
`
const IconContainer = styled.div`
display: flex;
margin-left: auto;
margin-right: 2.5%;
img{
  width: 2.5vw;
  height: 2.5vw;
}
`

const QuestionContainer = styled.div`
margin: 1vw 0;
width: 95%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
// background-color: khaki;
flex-direction: column;
`
const QuestionDiv = styled.div`
margin: 1vw 0;
width: 95%;
min-height: 18vw;
height: 100%;
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

const Inquiry = styled.div`
width: 100%;
// min-height: 4vw;
height: 100%;
max-height: 30vw;
overflow-y: scroll;
overflow-x: none;
white-space: initial; 
flex-wrap: wrap;
word-wrap: break-word;
margin-top: 1vw;
margin-bottom: auto;
display: flex;
// justify-content: center;
// align-items: center;
text-align: left;
// background-color: orangered;
color: #FF0000;

&::-webkit-scrollbar {
  width: 0.1vw;
}

&::-webkit-scrollbar-thumb {
  background: red; 
}

`
const SolveButton = styled.button`
margin: 1vw 0;
border: none;
font-size: 2vw;
padding: 0.25vw 0.5vw;
font-weight: 900;
background-color: #FF0000;
color: #F7F0F5;
&: hover{
  cursor: pointer;
}
`

export default Solve
import React, {useState, useRef, useEffect} from 'react'
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';
import { useStateContext } from '../context/StateContext';
import KSquestionABI from "../contracts/KSquestionNFT.json"
import {ethers, BigNumber} from "ethers";
import { useRouter } from 'next/router'
import SearchIcon from '../assets/SearchIcon.png'

const Learn = () => {
  
  const SearchRef = useRef()
  const router = useRouter()
  const { accounts , isActive, questionToBeViewed, onLoad, userKStokenCount, 
    setQuestionToBeViewed, KSquestionNFTContractAddress} = useStateContext();
  const [searchInput, setSearchInput] = useState("");
  const [ totalQuestions, setTotalQuestions] = useState([]);
  const [ questions, setQuestions] = useState([]);

  function ViewQuestion(question){
    setQuestionToBeViewed(question)
    router.push(`/question/${question[0]}`)
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
    let finalResponses = []
    let i = 0;
    for(i=0;i<response.length;i++){
      if(isActive(response[i][4],response[i][3]) == false){
        finalResponses.push(response[i])
      }
    }
    setQuestions(finalResponses);
    setTotalQuestions(finalResponses);
    }
  }

  function searchedFor(questionText, string){
    return Boolean(String(questionText.toLowerCase()).indexOf(string.toLowerCase()) >= 0)
  }

  useEffect(() => {
    VeiwAllQuestions()
    onLoad()
    setInterval(function() {
      VeiwAllQuestions()
      onLoad()
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

      <Container>
        <Title>Learn From Questions</Title>
        <SearchContainer>
        <SearchBox type="text" ref={SearchRef} />
        <IconContainer onClick={() => Search(SearchRef.current.value)}><Image src={SearchIcon} alt="search icon"/></IconContainer>
      </SearchContainer>

      {accounts[0] ? <>

      {userKStokenCount >= 1000 ?
      <QuestionContainer>
      {[...questions].reverse()?.map((question) => 
        <QuestionDiv key={question.id}>
        <QuestionBox>
          <MinorContainer><SubHeading>Question:</SubHeading><ViewContainer><ViewButton onClick={() => ViewQuestion(question)}>View</ViewButton></ViewContainer></MinorContainer>
          <Inquiry>{String(question[2])}</Inquiry>
        </QuestionBox>
      </QuestionDiv>
      )}
      </QuestionContainer> : <Marginer>
      <MinimumHold>Must hold at least 1000 KS tokens to learn</MinimumHold>
      </Marginer> }
      </> 
      : 
      <Marginer>
        <WalletPlease>Please Connect Wallet</WalletPlease>
        </Marginer>}

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
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
const Container = styled.div`
width: 60%;
height: 90%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title = styled.div`
width: 95%;
margin: 1vw 0;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
font-size: ${props => props.theme.fontHeading_large};
font-weight: ${props => props.theme.fontBold};
`
const SearchContainer = styled.div`
margin: 1vw 0;
width: 95%;
height: 4vw;
display: flex;
align-items: center;
flex-direction: row;
`
const SearchBox = styled.input`
margin-left: 2.5%;
border: 0.1vw solid ${props => props.theme.textColor};
display: flex;
width: 90%;
height: 90%;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
font-size: ${props => props.theme.fontSubheading_small};
`
const IconContainer = styled.div`
display: flex;
margin-left: auto;
margin-right: 1.5%;
img{
  width: 3vw;
  height: 3vw;

  &:hover{
    cursor: pointer;
    transform: scale(1.05);
  }
}
`
const QuestionContainer = styled.div`
margin: 1vw 0;
width: 95%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const QuestionDiv = styled.div`
margin: 1vw 0;
width: 95%;
min-height: 12vw;
height: auto;
display: flex;
border-radius: 1vw;
border: 0.5vw double ${props => props.theme.fonttextColor};
justify-content: center;
align-items: center;
`
const QuestionBox = styled.div`
width: 95%;
height: 100%;
margin: 1vw 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const MinorContainer = styled.div`
height: auto;
width: 100%;
display: flex;
flex-direction: row;
`
const SubHeading = styled.div`
display: flex;
align-items: center;
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`
const Inquiry = styled.div`
width: 100%;
height: 100%;
max-height: 30vw;
overflow-y: scroll;
margin-top: 1vw;
font-size: ${props => props.theme.fontSubheading_small};
margin-bottom: auto;
display: flex;
text-align: left;

&::-webkit-scrollbar {
  width: 1vw;
}

&::-webkit-scrollbar-thumb {
  background: ${props => props.theme.backgroundColor};

`
const ViewContainer = styled.div`
width: 30%;
height: 6vw;
flex-direction: row;
display: flex;
margin-bottom: auto;
margin-left: auto;
justify-content: center;
align-items: center;
`
const ViewButton = styled.button`
margin-top: auto;
margin-bottom: auto;
margin-left: auto;
border: none;
font-size: ${props => props.theme.fontButton_large};
padding: ${props => props.theme.buttonPadding_small};
font-weight: ${props => props.theme.fontBold};
background-color: ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};
&: hover{
  cursor: pointer;
}
`
const WalletPlease = styled.div`
font-size: ${props => props.theme.fontSubheading_large};
`
const MinimumHold = styled.div`
font-size: ${props => props.theme.fontSubheading_small};
`
const Marginer = styled.div`
  margin-top: 3vw;
  margin-bottom: 3vw;
`

export default Learn
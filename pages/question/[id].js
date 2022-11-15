import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import KSanswerABI from "../../contracts/KSanswerNFT.json"
import {ethers, BigNumber} from "ethers";
import KStokenABI from "../../contracts/KStoken.json"
import { useStateContext } from '../../context/StateContext';
import { toast } from "react-hot-toast";
import Image from 'next/image';
import KSquestionABI from "../../contracts/KSquestionNFT.json"
import CredibilityIcon from '../../assets/CredibilityIcon.png'
import { useRouter } from 'next/router'

const KStokenContractAddress = "0xa918f9581f2d56224152DD7A26dd4A62E5b74D66"
const KSanswerNFTContractAddress = "0xf27DEcD2065C30588197b68A5Bf02c785832829F"
const KSquestionNFTContractAddress = "0xb31db8a34Faa173df8Bc62e103827AFB00045FDF"

const QuestionDetails = () => {

  const router = useRouter()

  const { accounts, questionToBeViewed, setQuestionToBeViewed, awardCredibility, getUserCredibility, AwardBounty } = useStateContext();
  // const [currReplyerCred, setCurrReplyerCred] = useState(0);
  const [awardedAlready, setAwardedAlready ] = useState(false)
  const [tempLoader, setTempLoader] = useState(false)
  const [allRepliersAddresses, setAllRepliersAddressses] = useState([]);
  const [repliesDictionary, setRepliesDictionary] = useState({});
  const [questionReplies, setQuestionReplies] = useState([]);
  
  function convertToNormalTime(seconeds){
    let result;
    const temp = new Date( seconeds * 1000).toISOString()
    result = temp.substring(0,temp.indexOf("T"))
    return result
  }

  async function getReplies(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        KSanswerNFTContractAddress,
        KSanswerABI.abi,
        signer
      );
      try{
        const response = await contract.getAllAnswers();
        // console.log("Response", response)
        // console.log("ID 1 ", String(questionToBeViewed[0]))
        // console.log("ID 2 ", String(response[0][1]))
        // console.log("Compare", Boolean(parseInt(String(response[0][1])) === parseInt(String(questionToBeViewed[0]))))
        let i = 0;
        let questionResponses = [];
        for(i = 0; i < response.length;i++){
          if(parseInt(String(response[i][1])) == parseInt(String(questionToBeViewed[0]))){
            questionResponses.push(response[i]);
          }
        }
        // console.log(questionResponses);

        let j = 0;
        let repliersAddresses = [];
        for(j = 0; j < questionResponses.length; j++){
          repliersAddresses.push(questionResponses[j][2]);
        }
        repliersAddresses = [...new Set(repliersAddresses)];

        setAllRepliersAddressses(repliersAddresses);
        setQuestionReplies(questionResponses);

      }catch(err){
        console.log(err);
      }
  }

   async function getReplyCredibilityInternal(){
      let i = 0;
      let dic = {};
      for(i = 0; i < allRepliersAddresses.length; i++){
        const result = await getUserCredibility(allRepliersAddresses[i]);
        dic[allRepliersAddresses[i]] = result;
      }
      // console.log(dic);
      setRepliesDictionary(dic)

      // const finalresult = Promise.resolve(result).then(
      //   (value) => {
      //     // console.log(value); // "Success"
      //     setInterval(function() {
      //       setCurrReplyerCred(value)
      //     }, 10000);
      //   },
      //   (reason) => {
      //   },
      // );
      // return String(currReplyerCred);
      // let finalResult = String(result);
      // console.log(finalResult)
      // return finalresult
  }

  async function refresh(){
    await getReplies();
    await getReplyCredibilityInternal();
  }

  useEffect(() => {
    const questionID = String(router.asPath).slice(10);
    checkIFAwardedAlready(questionID);
    getReplies();
    getReplyCredibilityInternal();
    VeiwMyQuestion();
    refresh();
    setInterval(function() {
      checkIFAwardedAlready(questionID);
      getReplies()
    }, 60000);
  }, [accounts[0],questionToBeViewed,awardedAlready])

  async function VeiwMyQuestion(){
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
    const Path = String(router.asPath).slice(10)

    let i = 0;
    for(i=0;i<response.length;i++){
      if(String(response[i][0]) === Path){
        setQuestionToBeViewed(response[i])
      }
    }
    refresh();
    }
  }

  
async function checkIFAwardedAlready(_questionID){

  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const KStokensContract = await new ethers.Contract(
      KStokenContractAddress,
      KStokenABI.abi,
      signer
    )
    const response = await KStokensContract.bountyLeftOnQuestion(_questionID);
    // console.log(String(response))
    if(parseInt(String(response)) == 0 ){
      setAwardedAlready(true)
    }else{
      setAwardedAlready(false)
    }

    }catch(err){}
  }


   function onClickBountyAward(_replier){
    setTempLoader(true)

    setTimeout(function () {
    try{
    console.log(tempLoader)
    const questionID = String(router.asPath).slice(10);
    AwardBounty(questionID,_replier)
    awardCredibility(_replier)
    // router.reload()
}
    catch(err){console.log(err)}
    setAwardedAlready(true)
    }, 1000)
  }

  return (
    <Section onMouseOver={refresh} onMouseMove={refresh}>
      {accounts[0] ?
      <>
      {questionToBeViewed ? <>
      <HeaderDiv>
        <Heading>Question: </Heading>
        <QuestionDetailsContainer>
          <Asker>Asker: {questionToBeViewed[1]} </Asker>
          <TimeAsked>Asked On: {convertToNormalTime(questionToBeViewed[4])}</TimeAsked>
        </QuestionDetailsContainer>
      </HeaderDiv>

      <Question>{questionToBeViewed[2]}</Question>

      <Divider></Divider>

      {questionReplies.length === 0 ? <Heading>No Answers yet !</Heading> : <></>}

      {questionReplies?.map((reply) => 
          <ReplyContainer key={reply.id}>
              <ReplyContainerHeader>
                  <ReplyHeaderItem>Replier: {String(reply[2])}</ReplyHeaderItem>

                  <CredibilityDiv>
                  <ReplyHeaderItem>User Credibility: {String(repliesDictionary[reply[2]])}</ReplyHeaderItem>
                  <CredibilityIconContainer><Image src={CredibilityIcon} alt="" /></CredibilityIconContainer>
                  </CredibilityDiv>

              </ReplyContainerHeader>

              <MainReplyContainer>{String(reply[3])}</MainReplyContainer>
              {String(accounts[0]) === String(questionToBeViewed[1]) && 
                  <LeftLeanerDiv>
                    {awardedAlready ? <></> : 
                    <>
      {tempLoader ?
      <ReplyHeaderItem>Loading ...</ReplyHeaderItem>
      : <AwardButton onClick={() => onClickBountyAward(String(reply[2]))}>Award Bounty !</AwardButton>}
                    </>
      }
                    {/* <AwardButton>Award Credibility !</AwardButton> */}
                    </LeftLeanerDiv>
              }
          </ReplyContainer>
      )}

    <ExtraMargin></ExtraMargin>
        </> // refreshed
        : <>        <ExtraMargin />
                    <Heading> Loading ... </Heading> 
                    </>}
       </> 
       :     // NOT CONNECTED
       <>
        <ExtraMargin />
        <Heading>Connect Wallet First Please !</Heading>
        </>
    }
    </Section>
  )
}


const Section = styled.section`
display: flex;
width: 100%;
min-height: 50vw;
border-top: 0.05vw solid red;
height: 100%;
background-color: #F7F0F5;
// justify-content: center;
align-items: center;
flex-direction: column;
text-align: center;
// background-color: darkcyan;
`
const Heading = styled.div`
display: flex;
text-align: center;
justify-content: center;
align-items: center;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-size: 4vw;
font-weight: 900;
`

const QuestionDetailsContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Asker = styled.div`
display: flex;
text-align: center;
justify-content: center;
align-items: center;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-size: 1.5vw;
font-weight: 600;
`

const TimeAsked = styled.div`
display: flex;
text-align: center;
justify-content: center;
align-items: center;
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-size: 1vw;
font-weight: 600;
`

const HeaderDiv = styled.div`
  // background-color: yellow;
  display: flex;
  justify-content: space-between;
  margin-top: 1vw;
  width: 95%;
  flex-direction: row;
`

const Question = styled.div`
  display: flex;
  text-align: left;
  margin-top: 2vw;
  color: #FF0000;
  width: 95%;
  font-size: 2vw;
`

const Divider = styled.div`
  margin-top: 2vw;
  margin-bottom: 3vw;
  border-top: 0.25vw solid red;
  border-bottom: 0.25vw solid red;
  width: 95%;
  height: 0.9vw;
`
const ReplyContainer = styled.div`
  width: 95%;
  border: 0.5vw double red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1vw;
  margin-bottom: 1vw;
  // background-color: yellow;
`

const ReplyContainerHeader = styled.div`
display: flex;
width: 95%;
margin-top: 1vw;
justify-content: space-between;
align-items: center;
flex-direction: row;
// background-color: orange;
`
const CredibilityIconContainer = styled.div`
display: flex;
margin-left: 0.25vw;
justify-content: center;
align-items: center;
img{
  width: 1.5vw;
  height: 1.5vw;
}
`
const CredibilityDiv = styled.div`
// width: 40%;
// background-color: navajowhite;
flex-direction: row;
// height: 100%;
display: flex;
`

const ReplyHeaderItem = styled.div`
display: flex;
color: #FF0000;
font-size: 1.5vw;
font-weight: 600;
// background-color: blue;
`
const MainReplyContainer = styled.div`
text-align: left;
margin-top: 1vw;
margin-bottom: 1vw;
width: 95%;
color: #FF0000;
font-size: 1.25vw;
`

const ExtraMargin = styled.div`
margin-bottom: 5vw;
`

const LeftLeanerDiv = styled.div`
display: flex;
width: 95%;
height: 100%;
justify-content: right;
align-items: center;
// background-color: yellow;
flex-direction: row;
`

const AwardButton = styled.button`
display: flex;
background-color: #FF0000;
color: #F7F0F5;
margin-left: 0.25vw;
margin-right: 0.25vw;
// margin-left: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: 1.5vw;
font-weight: 900;
margin-bottom: 0.25vw;
padding 0.45vw 0.75vw;
border: none;
background-color: ff0000;
&:hover{
    // border: 1px solid #6610F2;
    transform: scale(0.95);
    cursor: pointer;
}
`

export default QuestionDetails
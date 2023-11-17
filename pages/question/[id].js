import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import KSanswerABI from "../../contracts/KSanswerNFT.json"
import {ethers} from "ethers"
import KStokenABI from "../../contracts/KStoken.json"
import { useStateContext } from '../../context/StateContext'
import Image from 'next/image'
import KSquestionABI from "../../contracts/KSquestionNFT.json"
import { useRouter } from 'next/router'
import RedCredLogo from '../../assets/RedCredibilityIcon.png'
import toast from 'react-hot-toast'

const QuestionDetails = () => {

  const router = useRouter()

  const { accounts, questionToBeViewed, setQuestionToBeViewed, awardCredibility, getUserCredibility, 
    AwardBounty, KStokenContractAddress, KSanswerNFTContractAddress,KSquestionNFTContractAddress
   } = useStateContext();
  
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

        const questionID = String(router.asPath).slice(10)
        const response = await contract.getRepliesByID(questionID);

        let i = 0;
        let replies = [];
        for(i = 0; i < response.length;i++){
          const TokenURI = `https://${response[i][0]}.ipfs.w3s.link/reply.json`;
          const tokenURIResponse = await fetch(TokenURI)
            .then(res => res.json())
            .then(data => { return data})
            replies.push(tokenURIResponse);
        }

        let j = 0;
        let repliersAddresses = [];
        for(j = 0; j < replies.length; j++){
          repliersAddresses.push(replies[j].replier);
        }
        repliersAddresses = [...new Set(repliersAddresses)];

        setAllRepliersAddressses(repliersAddresses);
        setQuestionReplies(replies);

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
      const TokenURI = `https://${response[i]}.ipfs.w3s.link/question.json`;
      const tokenURIResponse = await fetch(TokenURI)
        .then(res => res.json())
        .then(data => { return data})
        if(tokenURIResponse.questionID == Path){
          setQuestionToBeViewed(tokenURIResponse)
        }
    }
    refresh();
    }
  }

  
async function checkIFAwardedAlready(_questionID){
  let response;
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const KStokensContract = await new ethers.Contract(
      KStokenContractAddress,
      KStokenABI.abi,
      signer
    )
    response = await KStokensContract.bountyLeftOnQuestion(_questionID);
    // console.log(parseInt(String(response)))
    if(parseInt(String(response)) == 0 ){
      setAwardedAlready(true)
    }else{
      setAwardedAlready(false)
    }
    }catch(err){}
  }


   function onClickBountyAward(_replier){
    setTempLoader(true)

    setTimeout(async function () {
    try{
    const questionID = String(router.asPath).slice(10);
    await AwardBounty(questionID , _replier)
    await awardCredibility(_replier)
}
    catch(err){toast.error("Cancelled Awarding Proccess !")}
    setAwardedAlready(true)
    }, 1000)
  }

  return (
    <>

    <NewSection onMouseOver={refresh} onMouseMove={refresh}>
      <NewContainer>
      {accounts[0] ?
      <>
      {questionToBeViewed ? <>

      <TextContainer>
        <HeaderBox>
          <WalletID><p><b>Asker:</b> {questionToBeViewed.asker}</p></WalletID>
          <DateOfInquiry>Asked On: {convertToNormalTime(questionToBeViewed.timeStamp)}</DateOfInquiry>
        </HeaderBox>
        <Title>{questionToBeViewed.title}</Title>
        <Description>{questionToBeViewed.description}</Description>
      </TextContainer>

      {questionReplies.length === 0 ? <Heading>No Answers yet !</Heading> : <></>}
   
      {questionReplies?.map((reply) => 
        <ThreadDiv key={reply.id}>
          <ThreadContent>
            <ThreadText>
              <InfoRow>
                  <ReplierID>Replier: {reply.replier} 
                  <BountyDiv>
                    {String(repliesDictionary[reply.replier])}
                    <CredLogoDiv><Image src={RedCredLogo} alt="Credibility Icon"/></CredLogoDiv>
                  </BountyDiv> 
                  </ReplierID>  
                      
              </InfoRow>
              <ThreadDesc>{reply.reply}</ThreadDesc>
            </ThreadText>
            
            </ThreadContent> 
            {String(accounts[0]) === String(questionToBeViewed.asker) && 
                    <LeftLeanerDiv>
                    {awardedAlready ? <></> : 
                    <>
      {tempLoader ?
      <ReplyHeaderItem>Loading ...</ReplyHeaderItem>
      : <AwardButton onClick={() => onClickBountyAward(String(reply.replier))}>Award Bounty !</AwardButton>}
                    </>
      }
                    </LeftLeanerDiv>            
                   }   
          </ThreadDiv>
      )}
        </> // refreshed
        : <>        
                    <Heading> Loading ... </Heading> 
                    </>}
       </> 
       :     // NOT CONNECTED
       <>
        <Heading>Connect Wallet First Please !</Heading>
        </>
    }
    </NewContainer>
    </NewSection>
    </>
  )
}

const Heading = styled.div`
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`
const ReplyHeaderItem = styled.div`
display: flex;
font-size: ${props => props.theme.fontParagraph_large};
font-weight: ${props => props.theme.fontBold};
`

const LeftLeanerDiv = styled.div`
margin-bottom: 1vw;
`
const AwardButton = styled.button`
background-color: ${props => props.theme.textColor};
color: ${props => props.theme.backgroundColor};
font-size: ${props => props.theme.fontButton_small};
font-weight: ${props => props.theme.fontBold};
padding: ${props => props.theme.buttonPadding_small};
border: none;
&:hover{
    transform: scale(0.95);
    cursor: pointer;
}
`
const NewSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 61.5vh;
height: 100%;
`
const NewContainer = styled.div`
display: flex;
align-items: center;
margin: 5vw 0;
height: 100%;
width: 97%;
flex-direction: column;
`
const HeaderBox = styled.div`
display: flex;
height: 2vw;
justify-content: space-between;
align-items: center;
`
const TextContainer = styled.div`
display: flex;
width: 95%;
flex-direction: column;
margin-bottom: 2vw;
border-bottom: 0.2vw solid gainsboro;
`
const WalletID = styled.div`
font-size: ${props => props.theme.fontParagraph_small};
font-weight: ${props => props.theme.fontLight};
`
const DateOfInquiry = styled.div`
font-size: ${props => props.theme.fontParagraph_small};
font-weight: ${props => props.theme.fontLight};
`
const Title = styled.text`
text-align: justify;  
min-height: 2.0vw;
font-size: ${props => props.theme.fontSubheading_small};
font-weight: ${props => props.theme.fontBold};
margin-bottom: 0.5vw;
`
const Description = styled.text`
text-align: justify;
font-size: ${props => props.theme.fontParagraph_medium};
min-height: 1.5vw;
margin-bottom: 2vw;
`
const ThreadDiv = styled.div`
display: flex;
width: 100%;
min-height: 8vw;
height: 100%;
align-items: center;
box-shadow: 0.5vw 0.5vw 1vw gainsboro; 
margin-bottom: 1vw;
flex-direction: column;
`
const ThreadContent = styled.div`
display: flex;
width: 95%;
margin-top: 1vw;
justify-content: space-between;
`
const InfoRow = styled.div`
`
const ReplierID = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: ${props => props.theme.fontParagraph_medium};
`
const BountyDiv = styled.div`
display: flex;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontBold};
align-items: center;
margin-bottom: auto;
color: ${props => props.theme.textColor};
`
const ThreadText = styled.div`
display: flex;
margin: 0.5vw 0;
font-weight: ${props => props.theme.fontBold};
width: 100%;
flex-direction: column;
`
const ThreadDesc = styled.text`
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontLight};
text-align: justify;
margin: 0.5vw 0;
`
const CredLogoDiv = styled.div`
display: flex;
margin-left: 0.25vw;
img{
width: 1.25vw;
height: 1.25vw;
}
`
export default QuestionDetails
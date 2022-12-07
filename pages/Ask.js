import React, {useRef, useState, useEffect}  from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/StateContext';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
import KSquestionABI from "../contracts/KSquestionNFT.json"
import {ethers, BigNumber} from "ethers";
import AsyncSelect from 'react-select/async'

const Ask = () => {

  const TitleRef = useRef();
  const DescriptionRef = useRef();
  const BountyRef = useRef();
  const router = useRouter()
  const { accounts, userKStokenCount, onLoad, HoldBounty , KSquestionNFTContractAddress, 
    makeQuestionJson, makeFileObjects, storeFiles } = useStateContext();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [checker, setChecker] = useState();

  useEffect(() => {
      onLoad()
  }, [accounts[0]])

  const getTopic = (selectedOption) => {
    setTopic(selectedOption)
  }

  async function AskQuestion(){

    // Condtions of Approval
    if(TitleRef.current.value === undefined){
      toast.error("Must Include Title"); return;
    }
    if(topic.label === undefined){
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
    const _topic = topic.label;
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
      setLoading(false)
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
      setLoading(false)
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
          <SelectDiv> 
          <AsyncSelect  
          loadOptions={loadOptions} 
          onChange={getTopic} 
          defaultOptions 
          menuPlacement="auto" 
          menuPosition="fixed" 
          theme={customTheme}
          styles = {colorStyles} 
          placeholder=""
          /> 
          </SelectDiv>

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
const SelectDiv = styled.div`
justify-content: center;
align-items: center;
// background-color: orange;
width: 90%;
`

const options = [
  { value: 'math', label: 'Math' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'english', label: 'English' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'literature', label: 'Literature' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'government', label: 'Government' },
  { value: 'politics', label: 'Politics' },
  { value: 'psychology', label: 'Psychology' },
  { value: 'astrology', label: 'Astrology' },
  { value: 'geology', label: 'Geology' },
  { value: 'research', label: 'Research' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'socializing', label: 'Socializing' },
  { value: 'travel', label: 'Travel' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'repair', label: 'Repair' },
  { value: 'automobile', label: 'Automobile' },
  { value: 'finances', label: 'Finances' },
  { value: 'legal', label: 'Legal' },
  { value: 'school', label: 'School' },
  { value: 'driving', label: 'Driving' },
  { value: 'communication', label: 'Communication' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'presenting', label: 'Presenting' },
  { value: 'emotions', label: 'Emotions' },
  { value: 'food', label: 'Food' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'cosmetics', label: 'Cosmetics' },
  { value: 'sports', label: 'Sports' },
  { value: 'bodybuilding', label: 'Bodybuilding' },
  { value: 'exercise', label: 'Exercise' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'health', label: 'Health' },
  { value: 'faith', label: 'Faith' },
  { value: 'news', label: 'News' },
  { value: 'advice', label: 'Advice' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'programming', label: 'Programming' },
  { value: 'software', label: 'Software' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'IT', label: 'IT' },
  { value: 'AI', label: 'AI' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'webDev', label: 'WebDev' },
  { value: 'technology', label: 'Technology' },
  { value: 'gaming', label: 'Gaming' },
]

const colorStyles = {
  control: (styles) => ({...styles, backgroundColor: "white",  fontWeight: "900", color: "black"}),
  control: (baseStyles, state) => ({
    ...baseStyles,
    // border: '0.15vw solid #A51C30',
    border: state.isFocused ? '0.15vw solid black' : '0.15vw solid #A51C30',
    ":hover":{
      borderColor: 'black',
    },
    
  }),
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    return {...styles, fontWeight: "900", color: "black" };
  },
  singleValue: (styles,{data}) => {
    return{
      ...styles,
      backgroundColor: 'gainsboro',
      marginRight: 'auto',
      padding: '0.2vw 0.5vw',
      
    };
  },
  dropdownIndicator: base => ({ ...base, color: `#A51C30` }),

  };


function customTheme(theme){
  return{
    ...theme,
    borderRadius: 0,
    // border: '0.15vw solid #A51C30',
    colors: {
      ...theme.colors,
      primary25: '#FF8585',
      primary: 'transparent',
    }
  }
}

const loadOptions = (searchValue, callback) => {
  setTimeout(() => {
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
    callback(filteredOptions);
  }, 2000)
}

export default Ask
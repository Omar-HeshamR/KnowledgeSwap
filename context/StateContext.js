import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import {ethers, BigNumber} from "ethers";
import ERC20abi from "../contracts/abi.json"
import KStokenABI from "../contracts/KStoken.json"
import KSquestionABI from "../contracts/KSquestionNFT.json"
import KnowledgeSwapCredibilityToken from "../contracts/KnowledgeSwapCredibilityToken.json"
import makeStorageClient from "../pages/api/web3storage"
import { useRouter } from 'next/router'

const { createHash } = require("crypto")

const KStokenContractAddress = "0x74357674cE37Eaf090785007FC9322caCBA0dF0a"
const KScredibilityContractAddress = "0xEaD7A0Cb8372B3F7B066a9859350D95Dc3678b73"
const KSquestionNFTContractAddress = "0x801eFd7091BCEfA2F4192eF6CCac913e68FCe4cE"
const KSanswerNFTContractAddress = "0xa4f6d93c19C0C5d49D92bA0eD3AA29c6Ee7736e8"

const ERC20ABI = ERC20abi

const Context = createContext();

export const StateContext = ({ children }) => {

  const router = useRouter()
  const [accounts, setAccounts] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [userKStokenCount, setUserKStokenCount]= useState(0);
  const [questionToBeAnswered, setQuestionToBeAnswered] = useState();
  const [questionToBeViewed, setQuestionToBeViewed] = useState();
  const [userKScredibilityCount, setUserKScredibilityCount]= useState(0);

  async function connectAccount() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(accounts);
        onLoad();
        toast.success(`Connected to ${accounts[0].substring(0,6)}...${accounts[0].substr(-5)}`);   
    }else{
      toast.error("Please download a wallet provider");
    }
}

  const onLoad = async () => {
    if(accounts[0]){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // KS Tokens Fetching
      let KStokens;
      const KStokensContract = await new ethers.Contract(
        KStokenContractAddress,
        ERC20ABI,
        provider
      )
      KStokens = await KStokensContract.balanceOf(accounts[0])
      KStokens = ethers.utils.formatEther(KStokens, 18)
      setUserKStokenCount(KStokens)

      // KS credibility Fetching
      let KScredibility;
      const KScredibilityContract = await new ethers.Contract(
        KScredibilityContractAddress,
        ERC20ABI,
        provider
      )
      KScredibility = await KScredibilityContract.balanceOf(accounts[0])
      KScredibility = ethers.utils.formatEther(KScredibility, 18)
      setUserKScredibilityCount(KScredibility)
    }
}

async function disconnectAccount(){
  setAccounts([]);
  setShowAccount(false);
}

function isActive(timeStamp, bounty){
  timeStamp = parseInt(timeStamp);
  bounty = parseInt(String(bounty))
  // console.log("timeStamp: ", timeStamp)
  // console.log("BOUNTY: ", bounty)
  // CAP BOUNTY TIME LIMIT AT 100 KS tokens
  // At count = 1, time should be 30 days
  
  // calculate amount ot be waited
  let amountToBeWaited = 0;

  if(bounty == 1 || bounty == 0){
    amountToBeWaited = 2592000;
  }
  if(bounty >= 100){
    amountToBeWaited = 86400;
  }
  if(bounty > 1 && bounty < 100){
    amountToBeWaited = 2592000 - (bounty * 25920)
  }

  // get current date
  var currentDateTime = new Date();
  const currentTimeInSec = currentDateTime.getTime() / 1000;
  // console.log("currentTimeInSec: ", currentTimeInSec)
  // console.log(timeStamp + amountToBeWaited)
  // console.log(Boolean( (timeStamp + amountToBeWaited) <= parseInt(currentTimeInSec)))
  // return true if..
  return Boolean( timeStamp + amountToBeWaited >= currentTimeInSec)
}

async function getUserCredibility(address){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const KScredibilityContract = await new ethers.Contract(
      KScredibilityContractAddress,
      ERC20ABI,
      provider
    )

    let KScredibility = await KScredibilityContract.balanceOf(address)
    // console.log("HERE?", String(KScredibility))
    // KScredibility = ethers.utils.formatEther(KScredibility, 18)
    KScredibility = ethers.utils.formatEther(KScredibility, 18)
    // console.log("HERE?", String(KScredibility));
    return String(KScredibility)
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
    return response
    }
  }

async function HoldBounty(_questionID, _bountyAmount){
  try{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const KStokensContract = await new ethers.Contract(
    KStokenContractAddress,
    KStokenABI.abi,
    signer
  )
  const response = await KStokensContract.holdBounty(_questionID, _bountyAmount);
  toast.success("Successfully Asked The Question!")
  // router.reload();
  router.push("/")

  }catch(err){console.log(err)}
  // console.log(response)
}

async function AwardBounty(_questionID, _userToBeRewarded){
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const KStokensContract = await new ethers.Contract(
      KStokenContractAddress,
      KStokenABI.abi,
      signer
    )
    const response = await KStokensContract.awardBounty(_questionID, _userToBeRewarded);
    }catch(err){console.log(err)}

  }

async function awardCredibility(_userToBeRewarded){
  try{
  let KScredibility;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const KScredibilityContract = await new ethers.Contract(
    KScredibilityContractAddress,
    KnowledgeSwapCredibilityToken.abi,
    signer
  )
  let mintAmount = BigInt(10 ** 18);
  KScredibility = await KScredibilityContract.mint(_userToBeRewarded, mintAmount);
  toast.success(`Succesfully Awarded!`);   
  }catch(err){console.log(err)}

}


// Uploading functionalties

function makeReplyJson(_questionID, _replier, _reply){

  const ToBeHashed = _questionID + _replier + _reply;
  const _replyID = createHash('sha256').update(ToBeHashed).digest('hex');

  let reply;
  reply = {
    "questionID": _questionID,
    "replier":  _replier,
    "reply": _reply,
    "replyID": _replyID,
}
return reply
}

function makeQuestionJson(_asker, _title, _topic, _description, _bounty){

  // ID Creation
  const ToBeHashed = _asker + _title + _topic + _description;
  const _ID = createHash('sha256').update(ToBeHashed).digest('hex');

  // Time Stamp in seconeds
  var currentDateTime = new Date();
  const _timeStamp = String(currentDateTime.getTime() / 1000);

  let question;
  question = {
      "questionID": _ID,
      "asker":  _asker,
      "bounty": _bounty,
      "topic": _topic,
      "title": _title,
      "description" : _description,
      "timeStamp" : _timeStamp
  }
  return question
}

function makeFileObjects (obj, extension){
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  const files = [
    new File([blob], `${extension}.json`)
  ] 
  return files
}

async function storeFiles (files) {
  const client = makeStorageClient();
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

async function fetchQuestionDetails(CID){
  const TokenURI = `https://${CID}.ipfs.w3s.link/question.json`;
  console.log(TokenURI)
  const tokenURIResponse = await fetch(TokenURI)
    .then(res => res.json())
    .then(data => { return data})
  console.log(tokenURIResponse);
}

    return(
        <Context.Provider
        value={{
             isActive,
             onLoad,
             accounts,
             connectAccount,
             showAccount,
             setShowAccount,
             userKStokenCount, 
             setUserKStokenCount,
             userKScredibilityCount, 
             setUserKScredibilityCount,
             disconnectAccount,
             questionToBeAnswered,
             setQuestionToBeAnswered,
             questionToBeViewed,
             setQuestionToBeViewed,
             getUserCredibility,
             VeiwAllQuestions,
             HoldBounty,
             AwardBounty,
             awardCredibility,
             
            // UPLOADING TO IPFS:
            makeQuestionJson,
            makeReplyJson,
            makeFileObjects,
            storeFiles,
            fetchQuestionDetails,

            // CONTRACT ADDRESSES
            KStokenContractAddress,
            KScredibilityContractAddress ,
            KSquestionNFTContractAddress ,
            KSanswerNFTContractAddress,

        }}
        >
          {children}
        </Context.Provider>
        )
}


export const useStateContext = () => useContext(Context);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import {ethers, BigNumber} from "ethers";
import ERC20abi from "../contracts/abi.json"
import KStokenABI from "../contracts/KStoken.json"
import KSquestionABI from "../contracts/KSquestionNFT.json"
import KnowledgeSwapCredibilityToken from "../contracts/KnowledgeSwapCredibilityToken.json"
import { useRouter } from 'next/router'
const keccak256 = require('keccak256')

const KStokenContractAddress = "0xa918f9581f2d56224152DD7A26dd4A62E5b74D66"
const KScredibilityContractAddress = "0xEa7e336E929eb9D2B992B2531e4f94c5FB7A9259"
const KSquestionNFTContractAddress = "0xb31db8a34Faa173df8Bc62e103827AFB00045FDF"
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

  const onLoad = async () =>{
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
    }catch(err){}

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
  KScredibility = await KScredibilityContract.mint(_userToBeRewarded, 1);
  }catch(err){}

  toast.success(`Succesfully Awarded!`);   

}


function Test(){
  // let stringfier ="";
  // let creator = "0x7bE28279812e86B6b449a22D2272561A7bBe5311" ;
  // let question = "How do levers create energy if the conservation of energy does not allow energy to be created?";
  // let encodePacked =  ethers.utils.concat([ ethers.utils.toUtf8Bytes(stringfier),
  //    ethers.utils.toUtf8Bytes(creator), ethers.utils.toUtf8Bytes(question) ])
  // let digest = parseInt((ethers.utils.keccak256(encodePacked))) % (10**16)
  // console.log(digest) 
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
             Test,
        }}
        >
          {children}
        </Context.Provider>
        )
}


export const useStateContext = () => useContext(Context);

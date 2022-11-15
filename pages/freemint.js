import React, {useRef} from 'react'
import styled from 'styled-components'
import Particle from '../components/Particle.js'
import {ethers, BigNumber} from "ethers";
import KStokenabi from "../contracts/KStoken.json"
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext';

const KStokenContractAddress = "0xa918f9581f2d56224152DD7A26dd4A62E5b74D66"

const FreeMint = () => {
    const { accounts } = useStateContext();
    const AddressRef = useRef();
    const router = useRouter();

    async function handleMint(){
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
              KStokenContractAddress,
              KStokenabi.abi,
              signer
            );
            try{
                    const response = await contract.mint(accounts[0] , 1500);
                    toast.success(`Succesfully Minted 1500 !`);   
                    router.push("./");
            }catch (err) {
                // console.log("HELLO")
                // console.log(err)
                toast.error('Error !', err);
            }
        }else{
          toast.error('Connect Wallet !');
        }
    }

  return (
    <Section>

        <Particle />

        <Heading>Mint a 1500 Free KnowledgeSwap Test Tokens</Heading>
        <SubHeading>Since we want to test everything, then ship the best possible product!</SubHeading>

        <InputContainer>
            <AddressText>Your Wallet Address: </AddressText>
            {accounts[0] ?             
              <Input>{accounts[0]}</Input>
:             <Input>Connect Wallet !</Input>}
        </InputContainer>

        <MintButton onClick={handleMint}>Mint !</MintButton>

    </Section>
  )
}

const Section = styled.div`
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
margin-top: 5.5vw;
font-family: "Red Hat Display", sans-serif; 
font-size: 4vw;
font-weight: 900;
`
const SubHeading = styled.div`
color: #FF0000;
font-family: "Red Hat Display", sans-serif; 
font-weight: 100;
width: 85%;
font-size: 1.25vw;
`

const InputContainer = styled.div`
margin-top: 5vw;
margin-bottom: 5vw;
display: flex;
flex-direction: row;
`

const Input = styled.div`
display: flex;
justify-content: center;
align-items: center;
border: 1px solid red;
width: 32vw;
font-size: 1.25vw;
font-weight: 600;
color: red;
`

const AddressText = styled.div`
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

export default FreeMint
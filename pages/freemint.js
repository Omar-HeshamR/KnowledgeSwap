import React, {useRef} from 'react'
import styled from 'styled-components'
import Particle from '../components/Particle.js'
import {ethers, BigNumber} from "ethers";
import KStokenabi from "../contracts/KStoken.json"
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext';

const FreeMint = () => {
    const { accounts, KStokenContractAddress } = useStateContext();
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
                    const response = await contract.mint(accounts[0] , 1500 );
                    toast.success(`Succesfully Minted 1500 !`);   
                    router.push("./");
            }catch (err) {
                // console.log("HELLO")
                console.log(err)
                toast.error('Error !', err);
            }
        }else{
          toast.error('Connect Wallet !');
        }
    }

  return (
    <Section>

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
align-items: center;
flex-direction: column;
text-align: center;
color: ${props => props.theme.textColor};
background-color: ${props => props.theme.backgroundColor};
`
const Heading = styled.div`
margin-top: 5.5vw;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontHeading_small};
font-weight: ${props => props.theme.fontBold};
`
const SubHeading = styled.div`
font-family: "Red Hat Display", sans-serif; 
font-weight: ${props => props.theme.fontLight};
width: 85%;
font-size: ${props => props.theme.fontParagraph_medium};
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
border: 0.15vw solid ${props => props.theme.textColor};
width: 32vw;
font-size: ${props => props.theme.fontParagraph_medium};
font-weight: ${props => props.theme.fontBold};
`

const AddressText = styled.div`
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontSubheading_medium};
font-weight: ${props => props.theme.fontBold};
margin-right: 4vw;
`

const MintButton = styled.button`
color: ${props => props.theme.backgroundColor};
background-color: ${props => props.theme.textColor};
display: flex;
margin-bottom: auto;
font-family: "Red Hat Display", sans-serif; 
font-size: ${props => props.theme.fontButton_large};
font-weight: ${props => props.theme.fontBold};
padding: ${props => props.theme.buttonPadding_medium};
border: none;
&:hover{
    border: 0.4vw solid #6610F2;
    transform: scale(1.05);
    cursor: pointer;
}
`

export default FreeMint
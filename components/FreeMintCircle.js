import React, {useLayoutEffect, useRef} from "react";
import { useWindowScroll } from "react-use";
import styled from "styled-components";
import Link from 'next/link';

const FreeMint = () => {

    const ref = useRef(null);
    const {y} = useWindowScroll();

    useLayoutEffect(()=> {
       if(y > 250){
        ref.current.style.display = "flex"
       }else{
        ref.current.style.display = "none"
       }
    },[y])

    return (
        <Mint ref={ref}>
           <Link href="./freemint">+</Link> 
        </Mint>
    )
}

const Mint = styled.div`
width: 3rem;
height: 3rem;
box-sizing: border-box;
margin: 0;
padding: 0;
color: white;
background-color: red;
font-size: 3.25vw;
position: fixed;
right: 1rem;
bottom 1rem;
a{
    text-decoration: none;
    color: white;
    &[aria-current] {
      color: white;
    }
  }
cursor: pointer;
display: none;
justify-content: center;
align-items: center;
border-radius: 50%;
transition: all 0.2s ease;

&:hover{
    transform: scale(1.2);
}
&:active{
    transform: scale(1.2);
}
`

export default FreeMint
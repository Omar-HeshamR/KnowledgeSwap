import Layout from "../components/Layout"
import styled from "styled-components"
import { createGlobalStyle } from 'styled-components'
import "@fontsource/red-hat-display"
import { StateContext } from "../context/StateContext"
import { Toaster } from 'react-hot-toast';

const GlobalStyle = createGlobalStyle`
  * 
    {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Red Hat Display", sans-serif; 
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
    <StateContext>
      <GlobalStyle />
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
    </StateContext>
    </>
  
  )
}

export default MyApp

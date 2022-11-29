import Layout from "../components/Layout"
import styled from "styled-components"
import { ThemeProvider } from "styled-components";
import {light} from "../styles/Themes.js"
import {dark} from "../styles/Themes.js"
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

function MyApp({ Component, pageProps , ...appProps}) {

  return ( 
    <>
    <StateContext>
      <GlobalStyle />
      <ThemeProvider theme = {light}>
        <Layout appProps={appProps}>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StateContext>
    </>
  )
  
}

export default MyApp

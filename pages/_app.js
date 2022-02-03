//Funções Globais
function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      /* ===== Scrollbar CSS ===== */
      /* Firefox */
      * {
        scrollbar-width: auto;
        scrollbar-color: #212931 #29333d;
      }
    
      /* Chrome, Edge, and Safari */
      *::-webkit-scrollbar {
        width: 10px;
      }
    
      *::-webkit-scrollbar-track {
        background: #29333d;
      }
    
      *::-webkit-scrollbar-thumb {
        background-color: #212931;
        border-radius: 10px;
        border: 0px none #ffffff;
      }

      body {
        font-family: 'Open Sans', sans-serif;
      }
  
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
  
}
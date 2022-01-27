import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'
import { FaLocationArrow } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function ChatPage(){
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  function handleNovaMensagem(novaMensagem){
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: 'rubensdimasjr',
      texto: novaMensagem
    }
    setListaDeMensagens([
      mensagem,
      ...listaDeMensagens
    ])
    setMensagem('');
  }

  function sendMassage(){
    if(mensagem === ''){
      return
    }else{
      handleNovaMensagem(mensagem);
    }
  }

  return(
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/the-last-of-us-streets-of-pittsburgh-1536x864.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '80%',
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: 'column',
              borderRadius: '5px',
              padding: '16px'
          }}
        >
          
          <MessageList mensagens={listaDeMensagens} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
            return(
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}: {mensagemAtual.texto}
              </li>
            )
          })} */}

          <Box
            as="form"
            styleSheet={{
                display: 'flex',
                alignItems: 'center'
            }}
          >
            <TextField
              value={mensagem}
              onChange={(evento) => {
                const valor = evento.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(evento) => {
                
                if(evento.key === 'Enter'){
                  evento.preventDefault();
                  sendMassage(); // verificando a mensagem
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  marginRight: '.8em',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  color: appConfig.theme.colors.neutrals[200],
              }}
            >
            </TextField>
              <IconContext.Provider 
                value={{ style:{color: '#ccc', width: '1.5em', height: '1.5em', cursor: 'pointer'} 
                }}
              >
                <FaLocationArrow 
                  onClick={() => sendMassage()}
                />
              </IconContext.Provider>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  function Header() {
    return (
      <>
        <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <Text variant='heading5'>
              Chat
          </Text>
          <Button
              variant='tertiary'
              colorVariant='neutral'
              label='Logout'
              href="/"
          />
        </Box>
      </>
    )
  }

  function MessageList(props){
    return (
      <Box
        tag="ul"
        styleSheet={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            flex: 1,
            color: appConfig.theme.colors.neutrals["000"],
            marginBottom: '16px',
        }}
      >
        {props.mensagens.map((mensagem) => {
          return(
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                  borderRadius: '5px',
                  padding: '6px',
                  marginBottom: '12px',
                  marginRight: '6px',
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                  }
              }}
            > 
              <Box
                styleSheet={{
                    marginBottom: '8px',
                }}
              >
                <Image
                  styleSheet={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                  }}
                  src={`https://github.com/rubensdimasjr.png`}
                />

                <Text tag="strong">
                  {mensagem.de}
                </Text>
                <Text
                  styleSheet={{
                      fontSize: '10px',
                      marginLeft: '8px',
                      color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {(new Date().toLocaleDateString())}
                </Text>
              </Box>
                {mensagem.texto}
            </Text>
          )
        })}
        
      </Box>
    )
  }
}
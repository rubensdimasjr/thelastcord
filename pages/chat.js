import { Box, Text, Image } from '@skynexui/components'
import * as React from 'react';
import appConfig from '../config.json'
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNjgwNSwiZXhwIjoxOTU4ODgyODA1fQ.deQWSwiGpViJG39o9zOP50vycMVZBFvrVvk2RRisANM";
const  SUPABASE_URL = "https://jkwdqopgjqovtuhfyatz.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage(){
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data)
      });
  }, []);

  function handleNovaMensagem(novaMensagem){
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem
    }

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        setListaDeMensagens([
          data[0],
          ...listaDeMensagens
        ]);
      });

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
        backgroundColor: appConfig.theme.colors.neutrals[500],
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

          <Paper
            elevation={0}
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[500]
            }}
          >
            <InputBase
              multiline={true}
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
              sx={{
                  ml: 1, 
                  flex: 1, 
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  marginRight: '2px',
                  backgroundColor: appConfig.theme.colors.neutrals[500],
                  color: appConfig.theme.colors.neutrals[300],
              }}
            />
            <IconButton
              onClick={() => sendMassage()} 
              sx={{ 
                p: '10px', 
                color: appConfig.theme.colors.neutrals[300],
                '&:hover': {
                  color: 'white',
                }
              }} 
              aria-label="directions">
                <SendIcon />
            </IconButton>
          </Paper>
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
            variant="outlined"
            color='info'
            href='/'
            endIcon={<ExitToAppIcon
                color='info'
              />}
            sx={{ 
              color: appConfig.theme.colors.neutrals[300],
              '&:hover': {

              }
             }}
          >
            Logout
          </Button>
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
                    position: 'relative',
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
                  src={`https://github.com/${mensagem.de}.png`}
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
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Title(props){
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag}{
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size:1.5em;
          font-weight: 600;
        }
      `}
      </style>
    </>
  );
}

//Componente React
/* function HomePage() {
  return (
    <>
      <div>
        <GlobalStyle />
        <Title tag="h2">Com grandes poderes vêm grandes responsabilidades</Title>
        <h3>Discord - Aranhacord</h3>
      </div>
    </>
  )
} */
//export default HomePage

export default function PaginaInicial() {

  const [username, setUsername] = React.useState('rubensdimasjr');
  const roteamento = useRouter();

  function getUsername(user){
    return user.length == 0 ? 'rubensdimasjr' : user
  }
  
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[400],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/the-last-of-us-streets-of-pittsburgh-1536x864.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              // console.log('Houve uma submissão')
              roteamento.push('/chat');
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title>Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(infosDoEvento) => {
                const valor = infosDoEvento.target.value;
                
                setUsername(valor);
                

              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${getUsername(username)}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {getUsername(username)}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
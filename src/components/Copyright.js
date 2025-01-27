// general
import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive'

// material ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../AuthContext';

// components
import LoginDialog from './dialogs/LoginDialog';
import { CustomColorScheme } from './CustomTheme';

//////////////////////////////

export default function Copyright() {

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const uptakeblueUrl = 'https://d3rqy5efbrvoqx.cloudfront.net';

  const {
    signOut,
    isAuthenticated,
  } = useContext(AuthContext)

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);


  // event handlers //////////////

  const handleLogin = async () => {
    setLoginDialogOpen(true)
  };

  const handleLogout = () => {
    signOut();
  };


  return (
    <Stack
      marginTop={2}
      display='flex'
      flexGrow={1}
      justifyContent='center'
      textAlign='center'
      color='white'
      paddingBottom={2}
    >
      <Box>
        Copyright 2006-{dayjs().format('YYYY')}
        <Link
          target="_blank"
          href={uptakeblueUrl}
          sx={{
            color: CustomColorScheme['white'],
            paddingX: 1,
            textDecoration: 'none',
          }}
        >
          @
        </Link>
        Michael Rubin{isMobile ? <br /> : ", "} All rights
        reserved
      </Box>
      <Typography
        sx={{
          paddingLeft: 1,
          cursor: 'pointer',
          '&:hover': {
            fontWeight: 'bold',
            textDecoration: 'underline',
          }
        }}
        variant='body1'
        component='div'
        fontSize={14}
        onClick={() => {
          isAuthenticated ? handleLogout() : handleLogin()
        }}
      >
        {
          isAuthenticated
            ? "logout"
            : isMobile ? "admin" : "admin login"
        }
      </Typography>
      <LoginDialog
        dialogOpen={loginDialogOpen}
        setDialogOpen={setLoginDialogOpen}
      />
    </Stack>
  );
}

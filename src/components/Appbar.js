// general
import * as React from 'react';
import { useMediaQuery } from 'react-responsive'

// material ui
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import { CustomColorScheme } from './CustomTheme';

//////////////////////////////

export default function RecipeAppBar() {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        backgroundColor: CustomColorScheme['appbar'],
      }}
    >
      <Container
        maxWidth='false'
        sx={{
          display: 'flex',
          maxWidth: 900,
          padding: 0,
          height: 40,
          justifyContent: 'start', // horizontal
          alignItems: 'center', // vertical
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          marginLeft={isMobile ? 2 : 0}>
          <img src='../../../bell-pepper-red.png'
            height={24}
            width={24}
          />
          <img src='../../../bell-pepper-white.png'
            height={24}
            width={24}
          />
          <img src='../../../bell-pepper-yellow.png'
            height={24}
            width={24}
          />
          <Typography
            sx={{ paddingLeft: 1 }}
            variant='body1'
            component='div'
            fontSize={18}
          >Michael's Recipe Collection</Typography>
        </Stack>
      </Container>
    </AppBar>
  );
}

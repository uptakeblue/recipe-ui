// general
import * as React from 'react';

// material ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// components
import { CustomColorScheme } from './CustomTheme';

//////////////////////////////

export default function CalendarAppBar({ component }) {
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
          padding: 0,
          height: 30,
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        {component}
      </Container>
    </AppBar>
  );
}

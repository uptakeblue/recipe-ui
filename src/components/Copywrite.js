// general
import * as React from 'react';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive'

// material ui
import Box from '@mui/material/Box';

// components
import { CustomColorScheme } from './CustomTheme';

//////////////////////////////

export default function Copywrite(props) {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <Box
      display='flex'
      flexGrow={1}
      justifyContent='center'
      textAlign='center'
      marginTop={2}
      color='white'
      paddingBottom={2}
    >
      Copyright 2006-{dayjs().format('YYYY')} © Michael Rubin {isMobile ? <br /> : ", "} All rights
      reserved
    </Box>
  );
}

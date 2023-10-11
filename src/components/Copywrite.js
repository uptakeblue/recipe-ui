// general
import * as React from 'react';
import dayjs from 'dayjs';

// material ui
import Box from '@mui/material/Box';

// components
import { CustomColorScheme } from './CustomTheme';

//////////////////////////////

export default function Copywrite(props) {
  return (
    <Box
      display='flex'
      flexGrow={1}
      justifyContent='center'
      marginTop={2}
      color='white'
    >
      Copyright 2006-{dayjs().format('YYYY')} © Michael Rubin, All rights
      reserved
    </Box>
  );
}

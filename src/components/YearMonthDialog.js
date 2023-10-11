// general
import '../App.css';
import React, { useState } from 'react';
import dayjs from 'dayjs';

// material ui
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

// components
import { CustomColorScheme } from '../components/CustomTheme';

const StyledLinkButton = styled(Typography)(({ theme }) => ({
  textTransform: 'lowercase',
  color: CustomColorScheme['text'],
  '&.MuiTypography-root,  &.MuiTypography-root:hover': {
    width: 45,
    height: 30,
    fontWeight: 'normal',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  '&.MuiTypography-root:hover': {
    textDecoration: 'underline',
  },
}));

//////////////////////////////////

export default function YearMonthDialog(props) {
  const { modalOpen, setModalOpen, getCalendarMonthItems, year, setYear } =
    props;

  const handleChangeMonthDate = (month) => {
    setModalOpen(false);
    let newDate = year + '-' + month + '-01';
    getCalendarMonthItems(newDate);
  };

  return (
    <Modal
      useLocation
      hideBackdrop={false}
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          outline: 'none',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 220,
          bgcolor: 'background.paper',
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            py: 0.5,
            justifyContent: 'center',
            display: 'flex',
          }}
          backgroundColor={CustomColorScheme['yellow']}
        >
          <Stack
            direction='row'
            spacing={0}
          >
            <StyledLinkButton onClick={() => setYear(year - 1)}>
              {'<<'}
            </StyledLinkButton>
            <Box paddingTop={0.75}>
              <span>{year}</span>
            </Box>
            <StyledLinkButton onClick={() => setYear(year + 1)}>
              {'>>'}
            </StyledLinkButton>
          </Stack>
        </Box>
        <Grid
          container
          spacing={1}
          border={0}
        >
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(1)}>
              Jan
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(2)}>
              Feb
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(3)}>
              Mar
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(4)}>
              Apr
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(5)}>
              May
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(6)}>
              Jun
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(7)}>
              Jul
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(8)}>
              Aug
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(9)}>
              Sep
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(10)}>
              Oct
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(11)}>
              Nov
            </StyledLinkButton>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
          >
            <StyledLinkButton onClick={() => handleChangeMonthDate(12)}>
              Dec
            </StyledLinkButton>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            py: 0.5,
            pb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          backgroundColor={CustomColorScheme['yellow']}
        >
          <StyledLinkButton
            onClick={() => {
              getCalendarMonthItems(dayjs().format('YYYY-MM-DD'));
              setModalOpen(false);
            }}
          >
            today
          </StyledLinkButton>
        </Box>
      </Paper>
    </Modal>
  );
}

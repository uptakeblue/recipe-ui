// general
import '../App.css';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import YearMonthDialog from '../components/YearMonthDialog';
import DateitemDialog from '../components/DateitemDialog';
import { TableCellHead, TableCellBody } from '../components/TableCells';


const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: CustomColorScheme['text'],
}));


//////////////////////////////////

export default function Home(props) {
  const {
    calendarMonthItems,
    getCalendarMonthItems,
    searchDate,
  } = props;

  // constants ///////////////////

  const navigate = useNavigate();

  const emptyDateitem = {
    cellcolor: '',
    date: null,
    description: '',
    detail: '',
    dateitemId: null,
    isHighlighted: false,
    includeInTasklist: false,
    defaultValue: false,
    numDays: 1,
    startdate: null,
    title: '',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [year, setYear] = useState(dayjs().year());
  const [openDateitemDialog, setOpenDateitemDialog] = useState(false);
  const [dateitemObj, setDateitemObj] = useState(emptyDateitem);

  // event handlers //////////////

  const handleYearmMonthDialogOpen = (event) => {
    setYear(dayjs(calendarMonthItems.monthdateCurrent).year());
    setModalOpen(true);
  };

  const handleDateitemDialogOpenNew = (dateStr) => {
    let ditem = emptyDateitem;
    ditem.startdate = dateStr;
    ditem.date = dateStr;
    setDateitemObj(ditem);
    setOpenDateitemDialog(true);
  };

  const handleDateitemDialogOpen = (dateitemId) => {
    let ditem = calendarMonthItems.dateitems[dateitemId];
    setDateitemObj(ditem);
    setOpenDateitemDialog(true);
  };

  // components //////////////////

  const ToolbarPlugin = () => {
    return (
      calendarMonthItems && (
        <Stack direction='row'>
          <StyledButton
            sx={{
              color: 'white',
            }}
            onClick={() =>
              handleMonthChange(calendarMonthItems.monthdatePrevious)
            }
          >
            {'<< prev'}
          </StyledButton>
          <Box
            flexGrow={1}
            textAlign='center'
          >
            <Typography
              variant='h6'
              component='span'
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => handleYearmMonthDialogOpen()}
            >
              {dayjs(calendarMonthItems.monthdateCurrent).format('MMMM YYYY')}
            </Typography>
          </Box>
          <StyledButton
            sx={{
              color: 'white',
            }}
            onClick={() => handleMonthChange(calendarMonthItems.monthdateNext)}
          >
            {'next >>'}
          </StyledButton>
        </Stack>
      )
    );
  };

  // event handlers  /////////////

  const handleMonthChange = (monthdate) => {
    getCalendarMonthItems(monthdate);
  };

  // render //////////////////////
  return (
    <>
      <Appbar component={<ToolbarPlugin />} />
      <Container
        maxWidth='false'
        sx={{
          paddingY: 1,
          bgcolor: CustomColorScheme['body'],
        }}
      >
        <Stack
          direction='row'
          spacing={0}
          sx={{ backgroundColor: 'white' }}
        >
          <TableCellHead
            index={0}
            val='Sunday'
          />
          <TableCellHead
            index={1}
            val='Monday'
          />
          <TableCellHead
            index={1}
            val='Tueday'
          />
          <TableCellHead
            index={1}
            val='Wednesday'
          />
          <TableCellHead
            index={1}
            val='Thursday'
          />
          <TableCellHead
            index={1}
            val='Friday'
          />
          <TableCellHead
            index={1}
            val='Saturday'
          />
        </Stack>
        {calendarMonthItems &&
          Object.keys(calendarMonthItems.weeks).map((idx) => {
            return (
              <Stack
                key={idx}
                direction='row'
                spacing={0}
                backgroundColor='white'
              >
                {calendarMonthItems.weeks[idx].map((dayObject, idx) => {
                  return (
                    <TableCellBody
                      key={idx}
                      dayObject={dayObject}
                      index={idx}
                      handleDateitemDialogOpenNew={handleDateitemDialogOpenNew}
                      handleDateitemDialogOpen={handleDateitemDialogOpen}
                      searchDate={searchDate}
                    />
                  );
                })}
              </Stack>
            );
          })}
        <Stack
          marginTop={0.5}
          direction='row'
          spacing={1}
          display='flex'
          justifyContent='center'
          divider={
            <Divider
              orientation='vertical'
              flexItem
            />
          }
        >
          <StyledButton>admin</StyledButton>
          <StyledButton
            onClick={() => handleMonthChange(dayjs().format('YYYY-MM-DD'))}
          >
            today
          </StyledButton>
          <StyledButton onClick={() => navigate('/search')}>
            search
          </StyledButton>
          <StyledButton>logout</StyledButton>
        </Stack>
      </Container>
      <Copywrite />
      <YearMonthDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getCalendarMonthItems={getCalendarMonthItems}
        year={year}
        setYear={setYear}
      />
      <DateitemDialog
        dateitemObj={dateitemObj}
        openDateitemDialog={openDateitemDialog}
        setOpenDateitemDialog={setOpenDateitemDialog}
      />
    </>
  );
}

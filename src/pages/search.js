// general
import '../App.css';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, Link } from 'react-router-dom';

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import { IconButton, InputAdornment, Typography } from '@mui/material';

//////////////////////////

const StyledLinkButton = styled(Typography)(({ theme }) => ({
  '&.MuiTypography-root,  &.MuiTypography-root:hover': {
    cursor: 'pointer',
    variant: 'body1',
    component: 'div',
    lineHeight: 'normal',
    gutterBottom: 1,
  },
  '&.MuiTypography-root:hover': {
    textDecoration: 'underline',
  },
}));


//////////////////////////

export default function Search(props) {
  const {
    searchResults,
    getSearchResults,
    keyword,
    setKeyword,
    getCalendarMonthItems,
    setSearchDate,
  } = props;

  // constants //////////////////

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // event handlers /////////////

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateClick = (dateStr) => {
    getCalendarMonthItems(dateStr);
    setSearchDate(dateStr)
    navigate("/");
  }

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      getSearchResults(keyword);
    } else if (event.key === 'Escape') {
      setKeyword('');
      getSearchResults(keyword);
    }
  }

  const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
    color: CustomColorScheme['text'],
    '&.MuiTableCell-root': {
      lineHeight: 0,
      backgroundColor: CustomColorScheme['tablehead'],
      borderColor: "white",
    }
  }));

  const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-root': {
      lineHeight: 0,
      borderColor: "white",
    }
  }));

  const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: CustomColorScheme['text'],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: CustomColorScheme['text'],
    },
  });

  // render /////////////////////

  return (
    <>
      <Appbar
        component={
          <Box
            flexGrow={1}
            textAlign='center'
          >
            <Typography
              variant='h6'
              component='span'
            >
              Search
            </Typography>
          </Box>
        }
      />
      <Container
        maxWidth='false'
        sx={{
          paddingY: 2,
          bgcolor: CustomColorScheme['body'],
        }}
      >
        <Container
          maxWidth='false'
          outline='none'
          sx={{
            maxWidth: 700,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              '&.MuiPaper-root': {
                outline: 'none',
                bgcolor: CustomColorScheme['nonmonth'],
              }
            }}
          >
            <Stack>
              <Stack direction='row'>
                <TextField
                  size='small'
                  variant='standard'
                  label=' Keyword'
                  value={keyword}
                  sx={{
                    marginY: 1,
                    bgcolor: 'white',
                    paddingX: 1,
                    '& label.Mui-root': {
                      marginLeft: 1,
                    },
                    '& label.Mui-focused': {
                      color: CustomColorScheme['text'],
                      marginLeft: 1,
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: CustomColorScheme['text'],
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => { getSearchResults(keyword); }}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => handleEnterKeyPress(e)}
                />
                <Box display='flex' flexGrow={1} />
                <Button
                  onClick={() => navigate('/')}
                  variant='outlined'
                  sx={{
                    marginTop: 2,
                    maxHeight: 30,
                    textTransform: 'none',
                    '&.MuiButton-root': {
                      color: CustomColorScheme['text'],
                      borderColor: CustomColorScheme['text'],
                      outlineColor: CustomColorScheme['text'],
                    }
                  }}
                >Return</Button>
              </Stack>
              <TableContainer component={Box} sx={{
                bgcolor: CustomColorScheme['weekend'],
                marginTop: 1,
              }}>
                <Table >
                  <TableHead>
                    <TableRow>
                      <StyledTableCellHead width={90} >Start Date</StyledTableCellHead>
                      <StyledTableCellHead width={25} align='right' >Days</StyledTableCellHead>
                      <StyledTableCellHead width={90} >End Date</StyledTableCellHead>
                      <StyledTableCellHead >Title</StyledTableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResults
                      ?
                      (rowsPerPage > 0
                        ? searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : searchResults
                      ).map((dateitem, idx) => {
                        return (
                          <TableRow sx={{
                            borderBottom: "1px solid white"
                          }}>
                            <StyledTableCellBody width={85} align='left' borderColor="white" sx={{ border: 0, }} >
                              <StyledLinkButton
                                sx={{
                                  fontSize: 14,
                                  textDecoration: 'underline',
                                }}
                                onClick={() => handleDateClick(dayjs(dateitem.startdate).format('YYYY-MM-DD'))}
                              >
                                {dayjs(dateitem.startdate).format('MMM DD, YYYY')}
                              </StyledLinkButton>
                            </StyledTableCellBody>
                            <StyledTableCellBody width={25} align='right' sx={{ border: 0, }} >{dateitem.numDays}</StyledTableCellBody>
                            <StyledTableCellBody width={85} align='right' sx={{ border: 0, }} >{dayjs(dateitem.startdate).add(dateitem.numDays - 1, 'day').format('MMM DD, YYYY')}</StyledTableCellBody>
                            <StyledTableCellBody align='left' sx={{ border: 0, }} >
                              <StyledLinkButton
                                sx={{
                                  fontSize: 15,
                                }}
                              >
                                {
                                  dateitem.description || dateitem.detail
                                    ?
                                    <Tooltip
                                      title={
                                        <>
                                          <div style={{
                                            whiteSpace: 'pre-line',
                                            fontSize: 14,
                                          }}>
                                            {dateitem.description}
                                          </div>
                                          {dateitem.description ? <br /> : <></>}
                                          <div style={{
                                            whiteSpace: 'pre-line',
                                          }}>
                                            {dateitem.detail}
                                          </div>
                                        </>
                                      }>
                                      {dateitem.title}
                                    </Tooltip>
                                    :
                                    dateitem.title
                                }

                              </StyledLinkButton>
                            </StyledTableCellBody>
                          </TableRow>
                        )
                      })
                      : <></>}
                  </TableBody>
                </Table>
              </TableContainer>
              {searchResults &&
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  showFirstButton
                  showLastButton
                  component="div"
                  count={searchResults.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </Stack>
          </Paper>
        </Container>
      </Container >
      <Copywrite />
    </>
  );
}

// general
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';

// material ui
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import { numberDays } from './resources';
import { DateitemDialogContext } from './AllContext';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

//////////////////////////////

export default function DateitemDialog(props) {
  const { dateitemObj, openDateitemDialog, setOpenDateitemDialog } = props;

  const { putDateitem, postDateitem, deleteDateitem } = useContext(
    DateitemDialogContext
  );
  // constants ///////////////

  const [dateitemId, setDateitemId] = useState();
  const [cellcolor, setCellcolor] = useState('');
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');
  const [includeInTasklist, setIncludeInTasklist] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [numDays, setNumDays] = useState(1);
  const [startDate, setStartDate] = useState(dayjs());
  const [title, setTitle] = useState('');
  const [dialogTitle, setDialogTitle] = useState();
  const [isNew, setIsNew] = useState();
  const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState();

  // event handlers //////////

  const handleSaveDateitem = () => {
    let dateitem = {
      cellcolor: cellcolor,
      description: description,
      detail: detail,
      isHighlighted: isHighlighted,
      includeInTasklist: includeInTasklist,
      dateitemId: dateitemId,
      numDays: numDays,
      startdate: dayjs(startDate).format('YYYY-MM-DD'),
      title: title,
    };
    if (isNew) {
      postDateitem(dateitem);
    } else {
      putDateitem(dateitem);
    }
    handleReturn();
  };

  const handleDeleteDateitem = () => {
    deleteDateitem(dateitemObj);
    setOpenDateitemDialog(false);
  };

  const handleReturn = () => {
    setDateitemId(null);
    setCellcolor('');
    setDescription('');
    setDetail('');
    setIncludeInTasklist(false);
    setIsHighlighted(false);
    setNumDays(1);
    setTitle('');
    setIsNew(null);
    setOpenDateitemDialog(false);
  };

  // useEffect ///////////////

  useEffect(() => {
    setDateitemId(dateitemObj.dateitemId);
    setCellcolor(dateitemObj.cellcolor ? dateitemObj.cellcolor : '');
    setDescription(dateitemObj.description);
    setDetail(dateitemObj.detail);
    setIncludeInTasklist(dateitemObj.includeInTasklist);
    setIsHighlighted(dateitemObj.isHighlighted);
    setNumDays(dateitemObj.numDays);
    setStartDate(dayjs(dateitemObj.startdate));
    setTitle(dateitemObj.title);
    let isNew = !(dateitemObj.dateitemId && dateitemObj.dateitemId > 0);
    setIsNew(isNew);
    setDialogTitle(isNew ? 'Edit A DateItem' : 'Create A New DateItem');
  }, [dateitemObj]);

  const colors = [
    'white',
    'cyan',
    'green',
    'blue',
    'purple',
    'red',
    'orange',
    'yellow',
  ];

  return (
    <Dialog
      open={openDateitemDialog}
      onClose={handleReturn}
    >
      <AppBar
        position='static'
        elevation={0}
        sx={{
          padding: 1,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          backgroundColor: CustomColorScheme['appbar'],
        }}
      >
        {dialogTitle}
      </AppBar>
      <Paper
        sx={{
          height: 590,
          width: 500,
          padding: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction='row'
            spacing={2}
          >
            <DatePicker
              sx={{
                width: 250,
              }}
              label='Start Date'
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id='numdays-label'>Days</InputLabel>
              <Select
                id='numdays-select'
                value={numDays}
                onChange={(e) => {
                  setNumDays(e.target.value);
                }}
                label='Days'
              >
                {numberDays.map((day) => {
                  return (
                    <MenuItem
                      key={day.value}
                      value={day.value}
                    >
                      {day.description}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction='row'
            spacing={2}
          >
            <Box sx={{ paddingLeft: 1, width: 242 }}>
              <InputLabel id='enddate-label'>End Date</InputLabel>
              <Box>
                {dayjs(startDate)
                  .add(numDays - 1, 'day')
                  .format('MMMM DD, YYYY')}
              </Box>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id='cellcolor-label'>Cellcolor</InputLabel>
              <Select
                id='cellcolor-select'
                value={cellcolor}
                sx={{
                  bgcolor: CustomColorScheme[cellcolor],
                }}
                onChange={(e) => {
                  setCellcolor(e.target.value.toLowerCase());
                }}
                label='Cellcolor'
              >
                <MenuItem
                  key={''}
                  value={''}
                >
                  None
                </MenuItem>
                {colors.map((color) => {
                  return (
                    <MenuItem
                      key={color}
                      value={color}
                      sx={{
                        '&.MuiMenuItem-root, &.MuiMenuItem-root:hover': {
                          bgcolor: CustomColorScheme[color],
                        },
                      }}
                    >
                      {color.substring(0, 1).toUpperCase() + color.substring(1)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  paddingY: 0,
                }}
                checked={isHighlighted}
                onChange={(e) => setIsHighlighted(e.target.checked)}
              />
            }
            label='Highlighted'
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  paddingY: 0,
                }}
                checked={includeInTasklist}
                onChange={(e) => setIncludeInTasklist(e.target.checked)}
              />
            }
            label='Include in Tasklist'
          />
          <TextField
            label='Title'
            sx={{
              width: 417,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Description'
            sx={{
              width: 417,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            multiline
            rows={5}
            label='Detail'
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <Stack
            direction='row'
            spacing={2}
          >
            <Button
              variant='contained'
              onClick={handleSaveDateitem}
            >
              Save
            </Button>
            {!isNew && (
              <Button
                color='error'
                variant='outlined'
                onClick={() => setOpenDeletionDialog(true)}
              >
                Delete
              </Button>
            )}
            <Button onClick={handleReturn}>Return</Button>
          </Stack>
        </Stack>
      </Paper>
      <DeleteConfirmationDialog
        message={deletionMessage}
        open={openDeletionDialog}
        setOpen={setOpenDeletionDialog}
        onDelete={handleDeleteDateitem}
      />
    </Dialog>
  );
}

// general
import '../App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// material ui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// pages
import Home from './home';
import Recipe from './recipe';

// custom components
import { BodyColor } from '../components/CustomTheme';

/////////////////////

export default function Index(props) {

  document.body.style.backgroundColor = BodyColor;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route
          path='/'
          element={
            <Home />
          }
        />
        <Route
          path='/recipe/:urltitle'
          element={
            <Recipe />
          }
        />
        <Route
          path='/detail/:urltitle'
          element={
            <Recipe />
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

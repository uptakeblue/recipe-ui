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
import Appbar from '../components/Appbar';

/////////////////////

export default function Index(props) {

  document.body.style.backgroundColor = BodyColor;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Appbar />
      <Routes>
        <Route
          path='/'
          element={
            <Home />
          }
        />
        <Route
          path='/recipe/:route'
          element={
            <Recipe />
          }
        />
        <Route
          path='/detail/:route'
          element={
            <Recipe />
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

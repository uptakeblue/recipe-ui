// general
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// material ui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// pages
import Home from './home';
import Search from './search';

// custom components
import { BodyColor } from '../components/CustomTheme';

/////////////////////

export default function Index(props) {
  const {
    calendarMonthItems,
    getCalendarMonthItems,
    searchResults,
    getSearchResults,
    keyword,
    setKeyword,
    searchDate,
    setSearchDate,
  } = props;

  document.body.style.backgroundColor = BodyColor;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              calendarMonthItems={calendarMonthItems}
              getCalendarMonthItems={getCalendarMonthItems}
              searchDate={searchDate}
            />
          }
        />
        <Route
          path='/search'
          element={
            <Search
              searchResults={searchResults}
              getSearchResults={getSearchResults}
              keyword={keyword}
              setKeyword={setKeyword}
              getCalendarMonthItems={getCalendarMonthItems}
              setSearchDate={setSearchDate}
            />
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

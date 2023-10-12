// general
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// material ui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// pages
import Home from './home';

// custom components
import { BodyColor } from '../components/CustomTheme';

/////////////////////

export default function Index(props) {
  const {
    getRecipeMap,
    recipeSearchResults,
    getRecipeSearchResults,
    keyword,
    setKeyword,
  } = props;

  document.body.style.backgroundColor = BodyColor;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              recipeSearchResults={recipeSearchResults}
              getRecipeSearchResults={getRecipeSearchResults}
            />
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

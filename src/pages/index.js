// general
import '../App.css';
import { Routes, Route } from 'react-router-dom';
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
  const {
    recipeSearchResults,
    getRecipeSearchResults,
    recipeMap,
    getRecipeByRoute,
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
        <Route
          path='/recipe/:urltitle'
          element={
            <Recipe
              recipeMap={recipeMap}
              getRecipeByRoute={getRecipeByRoute}
            />
          }

        >

        </Route>
      </Routes>
    </LocalizationProvider>
  );
}

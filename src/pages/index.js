// general
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// material ui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// pages
import Home from './Home';
import Recipe from './Recipe';
import RecipePrint from './RecipePrint';

// custom components
import { BodyColor } from '../components/CustomTheme';

/////////////////////

export default function Index(props) {
  const {
    recipeSearchResults,
    getRecipeSearchResults,
    recipeMap,
    getRecipeByRoute,
    localKeyword,
    setLocalKeyword,
    page,
    setPage,
    transmittedKeyword,
    setTransmittedKeyword,
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
              localKeyword={localKeyword}
              setLocalKeyword={setLocalKeyword}
              page={page}
              setPage={setPage}
              transmittedKeyword={transmittedKeyword}
              setTransmittedKeyword={setTransmittedKeyword}
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
        />
        <Route
          exact path='/recipeprint'
          element={
            <RecipePrint
              recipeMap={recipeMap}
            />
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

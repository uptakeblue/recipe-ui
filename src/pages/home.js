// general
import '../App.css';
import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";

// material ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper } from '@mui/material';

// icons
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import RecipeCard from '../components/RecipeCard';


//////////////////////////////////

export default function Home(props) {
  const {
    recipeSearchResults,
    getRecipeSearchResults,
    localKeyword,
    setLocalKeyword,
    page,
    setPage,
    transmittedKeyword,
    setTransmittedKeyword,
  } = props;

  // constants ///////////////////

  const countPerPage = 12;

  const pageCount = recipeSearchResults
    ? Math.ceil(recipeSearchResults.recipes.length / countPerPage)
    : 0;

  const recipesThisPage = recipeSearchResults
    ? recipeSearchResults.recipes.slice((page - 1) * countPerPage, page * countPerPage)
    : null

  // event handlers //////////////

  const handleGetSearchResults = (keyword) => {
    setPage(1)
    setLocalKeyword(keyword);
    setTransmittedKeyword(keyword)
    getRecipeSearchResults(keyword);
  }

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      setPage(1)
      setTransmittedKeyword(localKeyword)
      getRecipeSearchResults(localKeyword);
    } else if (event.key === 'Escape') {
      setPage(1)
      setTransmittedKeyword('')
      handleGetSearchResults('');
    }
  }

  const handlePaginationChange = (event, pge) => {
    if (recipeSearchResults) {
      setPage(pge);
    }
  };

  // components //////////////////
  const PageTitle = () => {
    let title = transmittedKeyword
      ? `Search Results for "${transmittedKeyword}"` + (recipeSearchResults ? ` (${recipeSearchResults.recipes.length})` : "")
      : (recipeSearchResults ? `All Recipes (${recipeSearchResults.recipes.length})` : 'All Recipes')

    return (
      <Typography
        variant='h5'
        display='flex'
        alignItems='center'
        color={CustomColorScheme['tan']}
      >
        {title}
      </Typography>);

  }

  // render //////////////////////

  return (
    <HelmetProvider>
      <Helmet>
        <title>Michael's Recipes</title>
      </Helmet>
      <Appbar />
      <Container
        maxWidth='false'
        sx={{
          maxWidth: 900,
        }}
      >
        <Stack
          direction="row"
          paddingY={1}
        >
          <PageTitle />
          <Box
            display='flex'
            flexGrow={1}
          />
          <TextField
            size='small'
            variant="filled"
            label=' Keyword'
            value={localKeyword}
            sx={{
              marginY: 1,
              paddingX: 1,
              '& .MuiFormLabel-root': {
                marginLeft: 1,
              },
              '& .MuiFilledInput-root': {

              },
              '& label.Mui-focused': {
                color: 'inherit',
                marginLeft: 1,
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: CustomColorScheme['text'],
              },
            }}
            onChange={(e) => setLocalKeyword(e.target.value)}
            onKeyDown={(e) => handleEnterKeyPress(e)}
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => handleGetSearchResults(localKeyword)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => handleGetSearchResults('')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              )
            }}
          />

        </Stack>
        <Grid
          container
          spacing={1}
        >
          {recipesThisPage &&
            Object.keys(recipesThisPage).map((idx) => {
              let rcp = recipesThisPage[idx];
              return (
                <RecipeCard key={idx} recipe={rcp} />
              );
            })}
        </Grid>
        <Box
          display='flex'
          flexGrow={1}
          alignItems='center'
          justifyContent='center'
          paddingTop={2}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePaginationChange}
          />
        </Box>
      </Container>
      <Copywrite />
    </HelmetProvider>
  );
}

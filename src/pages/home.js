// general
import '../App.css';
import React, { useContext, useEffect } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom';

// material ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// icons
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Copywrite from '../components/Copywrite';
import RecipeCard from '../components/RecipeCard';
import { HomeContext } from '../components/AllContext';

//////////////////////////////////

export default function Home(props) {

  const {
    recipeSearchResults,
    getRecipeSearchResults,
    localKeyword,
    setLocalKeyword,
    page,
    setPage,
    statusMessage,
    setStatusMessage,
  } = useContext(HomeContext);


  // constants ///////////////////

  const countPerPage = 12;
  const isMobile = useMediaQuery({ query: '(max-width: 750px)' });
  const location = useLocation();

  const pageCount = recipeSearchResults
    ? Math.ceil(recipeSearchResults.length / countPerPage)
    : 0;

  const recipesThisPage = recipeSearchResults
    ? recipeSearchResults.slice((page - 1) * countPerPage, page * countPerPage)
    : null


  // useEffect ///////////////////

  useEffect(() => {
    let keyword = localStorage.getItem("keyword") !== null
      ? JSON.parse(localStorage.getItem("keyword"))
      : ""
    setLocalKeyword(keyword);
    getRecipeSearchResults(keyword);
  }, []);


  // event handlers //////////////

  const handleGetSearchResults = (keyword) => {
    setPage(1)
    if (keyword) {
      localStorage.setItem("keyword", JSON.stringify(keyword));
    } else if (localStorage.getItem("keyword") !== null) {
      localStorage.removeItem("keyword");
    }
    setLocalKeyword(keyword);
    getRecipeSearchResults(keyword);
  }

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGetSearchResults(localKeyword);
    } else if (event.key === 'Escape') {
      handleGetSearchResults('');
    }
  }

  const handlePaginationChange = (event, pge) => {
    if (recipeSearchResults) {
      setPage(pge);
    }
  };

  const handleSnackbarTransition = (props) => {
    return <Slide {...props} direction="left" />;
  }


  // components //////////////////

  const PageTitle = () => {
    let keyword = localStorage.getItem("keyword") !== null
      ? JSON.parse(localStorage.getItem("keyword"))
      : ""
    let title = keyword
      ? `Search Results for "${keyword}"` + (recipeSearchResults ? ` (${recipeSearchResults.length})` : "")
      : (recipeSearchResults ? `All Recipes (${recipeSearchResults.length})` : 'All Recipes')

    return (
      <Typography
        variant='h5'
        color={CustomColorScheme['tan']}
        textAlign='center'
      >
        {title}
      </Typography>);

  }


  // render //////////////////////

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>Michael's Recipes</title>
        <meta property="og:title" content="Michael's Recipes" />
        {/* <meta property="og:image" content="apple-touch-icon.png" /> */}
        <meta property="og:url" content={location.pathname} />
        <meta property="og:image" content="https://zp2swlijyg.execute-api.us-west-2.amazonaws.com/dev/recipes-uptakeblue/image/1429_overnight-levain-white-bread.jpg" />
      </Helmet>
      <Container
        maxWidth='false'
        sx={{
          maxWidth: isMobile ? 780 : 900,
        }}
      >
        <Stack
          direction={isMobile ? 'column' : 'row'}
          paddingY={1}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <PageTitle />
          </Box>
          {!isMobile && (
            <Box
              display='flex'
              flexGrow={1}
            />)
          }
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
        {
          recipesThisPage
            ?
            <>
              <Grid
                container
                spacing={1}
              >
                {
                  recipesThisPage &&
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
            </>
            :
            <Box
              display='flex'
              flexGrow={1}
              height={350}
              justifyContent='center'
              alignItems='center'
            >
              <CircularProgress
                sx={{
                  color: CustomColorScheme['yellow'],
                }}
              />
            </Box>
        }
      </Container>
      <Snackbar
        open={statusMessage !== ''}
        onClose={() => setStatusMessage('')}
        autoHideDuration={3000}
        TransitionComponent={handleSnackbarTransition}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
      >
        <Alert
          onClose={() => setStatusMessage('')}
          severity={statusMessage.status}
          variant='filled'
          autoHideDuration={3000}
        >
          {statusMessage.message}
        </Alert>
      </Snackbar>
      <Copywrite />
    </HelmetProvider>
  );
}

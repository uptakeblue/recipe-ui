// general
import '../App.css';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// material ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper } from '@mui/material';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: CustomColorScheme['text'],
}));

//////////////////////////////////

export default function Home(props) {
  const {
    recipeSearchResults,
    getRecipeSearchResults,
  } = props;

  // constants ///////////////////
  const [localKeyword, setLocalKeyword] = useState('');
  // const [pageTitle, setPageTitle] = useState('Recipes');

  const navigate = useNavigate();


  // event handlers //////////////
  const handleGetSearchResults = (keyword) => {
    setLocalKeyword(keyword);
    getRecipeSearchResults(keyword);
  }

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      getRecipeSearchResults(localKeyword);
    } else if (event.key === 'Escape') {
      handleGetSearchResults('');
    }
  }

  // components //////////////////
  const PageTitle = () => {
    let title = localKeyword
      ? `Search Results for "${localKeyword}"`
      : 'All Recipes'
    return (
      <Typography
        variant='h5'
        display='flex'
        alignItems='center'
        color={CustomColorScheme['weekend']}
      >
        {title}
      </Typography>);

  }

  const RecipeCard = (recipe) => {
    if (recipe.recipe.imageFile) {
      let path = `../images/${recipe.recipe.imageFile}`;
      let imageFilepath = require(path);
      console.log("RecipeCard  imageFilepath", imageFilepath);
    }

    // let requiredImage = require(imagefilePath)
    let imagefile = recipe.recipe.imageFile
      // ? `url(/../images/${recipe.recipe.imageFile})`
      // ? `url(${require(imagefilePath)})`
      // ? `url(${require('../images/62_baked-kabocha-pumpkin.jpeg')})`
      // ? `url(${require("../images/391_chickpea-and-celery-soup-with-chile-garlic-oil.JPEG")})`
      ? `url(${require("../images/391_chickpea-and-celery-soup-with-chile-garlic-oil.JPEG")})`
      : "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')";
    // : null;
    if (recipe.recipe.imageFile) console.log("RecipeCard", imagefile);
    return (
      <Grid item >
        <Paper
          sx={{
            height: 239,
            width: 276,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            background: imagefile,
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* <img src={require(imagefilePath)} /> */}
          {recipe.title}
          <Box
            width={276}
            height={100}
            bgcolor={CustomColorScheme['weekend']}
            sx={{
              color: "black",
            }}
          >
            {recipe.recipe.title}
          </Box>
        </Paper>
      </Grid>
    )

  }

  // recipeSearchResults && console.log(recipeSearchResults.recipes[0])

  // render //////////////////////
  return (
    <>
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
                      onClick={() => getRecipeSearchResults(localKeyword)}
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
          {recipeSearchResults &&
            Object.keys(recipeSearchResults.recipes).map((idx) => {
              let rcp = recipeSearchResults.recipes[idx];
              return (
                // <Box
                //   key={idx}
                //   bgcolor={CustomColorScheme['mediumBrown']}
                //   padding={1}
                //   marginY={0.25}
                // >{recipe.title}</Box>
                <RecipeCard key={idx} recipe={rcp}
                />
              );
            })}
        </Grid>
      </Container>
      <Copywrite />
    </>
  );
}

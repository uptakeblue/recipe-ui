// general
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom'

// material ui
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// icons

// custom componets
import { CustomColorScheme } from './CustomTheme';
import { AppbarContext } from './AllContext';
import RecipeCreateDialog from './dialogs/RecipeCreateDialog';

//////////////////////////////

export default function RecipeAppBar(props) {

  const {
    createRecipe,
    getRecipeSearchResults,
  } = useContext(AppbarContext);


  // constants //////////////

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const location = useLocation();
  const navigate = useNavigate();

  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);


  // event handlers //////////////

  const handleRefresh = () => {
    if (location.pathname === "/") {
      let keyword = localStorage.getItem("keyword") !== null
        ? JSON.parse(localStorage.getItem("keyword"))
        : ""
      getRecipeSearchResults(keyword);
    } else {
      navigate("/")
    }
  }


  // render /////////////////

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        backgroundColor: CustomColorScheme['appbar'],
      }}
    >
      <Container
        maxWidth='false'
        sx={{
          display: 'flex',
          maxWidth: 900,
          padding: 0,
          height: 50,
          // justifyContent: isMobile ? 'center' : 'start', // horizontal
          justifyContent: 'start', // horizontal
          alignItems: 'center', // vertical
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems={isMobile ? 'center' : 'start'}
          marginLeft={isMobile ? 2 : 0}
        >
          <img src='../../../bell-pepper-red.png'
            height={24}
            width={24}
          />
          <img src='../../../bell-pepper-white.png'
            height={24}
            width={24}
          />
          <img src='../../../bell-pepper-yellow.png'
            height={24}
            width={24}
          />
          <Typography
            sx={{
              paddingLeft: 1,
              cursor: 'pointer',
              ':hover': {
                color: CustomColorScheme['lightYellow'],
              }
            }}
            variant='body1'
            component='div'
            fontSize={18}
            onClick={handleRefresh}
          >
            {isMobile ? "Michael's Recipes" : "Michael's Recipe Collection"}
          </Typography>
        </Stack>
      </Container>
      <RecipeCreateDialog
        dialogOpen={recipeDialogOpen}
        setDialogOpen={setRecipeDialogOpen}
        createRecipe={createRecipe}
      />
    </AppBar>
  );
}

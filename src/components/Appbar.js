// general
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom'

// material ui
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';

// icons
import NotificationsIcon from '@mui/icons-material/Notifications';

// custom componets
import { CustomColorScheme } from './CustomTheme';
import { AppbarContext } from './AllContext';
import RecipeCreateDialog from './dialogs/RecipeCreateDialog';
import { AuthContext } from '../AuthContext';

//////////////////////////////

export default function RecipeAppBar(props) {

  const {
    createRecipe,
    getRecipeSearchResults,
    newRecipes,
  } = useContext(AppbarContext);


  // constants //////////////

  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext)

  const isNewRecipes = Boolean(newRecipes && newRecipes.length && (!isMobile || (isMobile && !isAuthenticated)));


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

  const popperOpen = Boolean(anchorEl);
  const popperId = popperOpen ? 'simple-popover' : undefined;

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
          alignItems: 'center', // vertical
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems={isMobile ? 'center' : 'start'}
          marginLeft={isMobile ? 2 : 0}
          width='100%'
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
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: isNewRecipes ? 'center' : 'end',
            }}
          >
            {
              isAuthenticated &&
              <Typography
                onClick={() => setRecipeDialogOpen(true)}
                sx={{
                  cursor: 'pointer',
                  paddingRight: isNewRecipes ? 0 : 1.5,
                  ':hover': {
                    color: CustomColorScheme['lightYellow']
                  }
                }}
              >
                add a recipe
              </Typography>
            }
          </Box>
          {
            isNewRecipes &&
            <Stack
              direction='row'
              spacing={2}
              paddingRight={1.5}
              sx={{
                cursor: 'pointer',
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Badge
                badgeContent={newRecipes.length}
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    top: 4,
                    border: `2px solid ${CustomColorScheme['appbar']}`,
                    bgcolor: CustomColorScheme['brightOrange'],
                    color: CustomColorScheme['black'],
                  }
                }}
              >
                <NotificationsIcon
                  sx={{
                    color: CustomColorScheme['green']
                  }}
                />
              </Badge>
              <Typography
                sx={{
                  ':hover': {
                    color: CustomColorScheme['lightYellow'],
                  }
                }}
              >
                {isMobile ? "New!" : "New Recipes!"}
              </Typography>
            </Stack>
          }

        </Stack>
      </Container>
      <RecipeCreateDialog
        dialogOpen={recipeDialogOpen}
        setDialogOpen={setRecipeDialogOpen}
        createRecipe={createRecipe}
      />
      <Popover
        id={popperId}
        open={popperOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      ><Box
        backgroundColor={CustomColorScheme['tan']}
        paddingX={3}
        paddingY={1}
      >
          {
            isNewRecipes &&
            newRecipes.map((recipe, idx) => {
              return (
                <Typography
                  onClick={() => {
                    let forceRefresh = location.pathname.startsWith('/recipe/')
                    navigate(`/recipe/${recipe.route}`);
                    if (forceRefresh)
                      navigate(0);
                    setAnchorEl(null);
                  }}
                  sx={{
                    paddingY: 0.5,
                    cursor: 'pointer',
                    ':hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  {recipe.title}
                </Typography>
              )
            })
          }
        </Box>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
      </Popover>

    </AppBar>
  );
}

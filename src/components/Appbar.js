// general
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom'

// material ui
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// icons
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

// custom componets
import { CustomColorScheme } from './CustomTheme';
import { AppbarContext } from './AllContext';
import RecipeCreateDialog from './dialogs/RecipeCreateDialog';
import { AuthContext } from '../AuthContext';
import LoginDialog from './dialogs/LoginDialog';

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

  const {
    signOut,
    isAuthenticated,
  } = useContext(AuthContext)


  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);


  // event handlers //////////////

  const handleLogin = async () => {
    setLoginDialogOpen(true)
  };

  const handleLogout = () => {
    signOut();
  };


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
          justifyContent: 'start', // horizontal
          alignItems: 'center', // vertical
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          width='100%'
          alignItems='center'
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
            Michael's Recipe Collection
          </Typography>
          <Box
            display='flex'
            flexGrow={1}
            height={30}
          />
          {
            isAuthenticated
              ?
              <>
                {
                  location.pathname === "/" &&
                  <Tooltip title='Add a recipe' >
                    <IconButton
                      onClick={() => setRecipeDialogOpen(true)}
                    >
                      <AddIcon sx={{
                        color: 'white'
                      }}
                      />
                    </IconButton>
                  </Tooltip>
                }
                <Tooltip title='Log Out' >
                  <IconButton onClick={handleLogout} >
                    <LogoutIcon
                      sx={{
                        color: CustomColorScheme['white']
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </>
              :
              <Tooltip title='Administrative LogIn' >
                <IconButton onClick={handleLogin} >
                  <LoginIcon
                    sx={{
                      color: CustomColorScheme['white']
                    }}
                  />
                </IconButton>
              </Tooltip>
          }
        </Stack>
      </Container>
      <RecipeCreateDialog
        dialogOpen={recipeDialogOpen}
        setDialogOpen={setRecipeDialogOpen}
        createRecipe={createRecipe}
      />
      <LoginDialog
        dialogOpen={loginDialogOpen}
        setDialogOpen={setLoginDialogOpen}
      />
    </AppBar>
  );
}

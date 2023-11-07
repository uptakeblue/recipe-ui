// general
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive'

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

//////////////////////////////

export default function RecipeAppBar(props) {

  const {
    isAuthenticated,
    setIsAuthenticated,
    createRecipe,
  } = useContext(AppbarContext);


  // constants //////////////

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const [recipeCreateDialogOpen, setRecipeCreateDialogOpen] = useState(false);

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
          height: 40,
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
            sx={{ paddingLeft: 1 }}
            variant='body1'
            component='div'
            fontSize={18}
          >
            Michael's Recipe Collection
          </Typography>
          <Box
            display='flex'
            flexGrow={1}
            height={30}
          />
          {
            isAuthenticated &&
            <Tooltip title='Add a recipe' >
              <IconButton
                onClick={() => setRecipeCreateDialogOpen(true)}
              >
                <AddIcon sx={{
                  color: 'white'
                }}
                />
              </IconButton>
            </Tooltip>
          }
          <Tooltip title={isAuthenticated ? 'Log out' : 'Log in'} >
            <IconButton
              onClick={() => setIsAuthenticated(!isAuthenticated)}
            >
              {
                isAuthenticated
                  ? <LogoutIcon
                    sx={{
                      color: 'white'
                    }}
                  />
                  : <LoginIcon
                    sx={{
                      color: 'white'
                    }}
                  />
              }
            </IconButton>
          </Tooltip>
        </Stack>
      </Container>
      <RecipeCreateDialog
        dialogOpen={recipeCreateDialogOpen}
        setDialogOpen={setRecipeCreateDialogOpen}
        createRecipe={createRecipe}
      />
    </AppBar>
  );
}

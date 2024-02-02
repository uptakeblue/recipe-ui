// general
import '../App.css';
import { useState, useContext, forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive'

// material ui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

// icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import DeleteConfirmationDialog from './dialogs/DeleteConfirmationDialog';
import { AuthContext } from '../AuthContext';


const TabPanel = (props) => {
  const { children, value, index, lastIndex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

///////////////

const RecipeContent = forwardRef(function RecipeContent(props) {
  const {
    content,
    tabValue,
    setTabValue,
    contentIdx,
    contentLastIdx,
    handleUpdateRecipeContent,
    setContentDialogOpen,
    setContentSearchDialogOpen,
    setDialogContent,
    deleteRecipeContent,
  } = props;


  // constants /////////////////

  const [deletionConfirmationDialogOpen, setDeletionConfirmationDialogOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const { isAuthenticated } = useContext(AuthContext)
  // const isAuthenticated = false


  // event handlers ////////////

  const handleRecipeContentReorder = (newOrderId) => {
    handleUpdateRecipeContent({
      contentId: content.contentId,
      orderId: newOrderId,
    });
  }

  const handleRecipeContentDelete = () => {
    deleteRecipeContent(content.contentId);
  }

  const handleDialogOpen = () => {
    setDialogContent(content)
    setContentDialogOpen(true)
  }


  // components ////////////////

  const Title = (props) => {
    const { title } = props;
    return (
      <Stack
        direction='row'
        backgroundColor={CustomColorScheme['mediumBrown']}
        sx={{
          borderBottom: 1,
          borderColor: CustomColorScheme['tan']
        }}
      >
        <Typography
          variant='h6'
          component='div'
          justifyContent='start'
          display='flex'
          flexGrow={1}
          sx={{
            paddingX: 1,
            paddingY: .5,
            marginTop: 1,
            backgroundColor: CustomColorScheme['mediumBrown'],
            fontSize: 16,
            color: CustomColorScheme['white'],
            fontWeight: 'bold',

          }}
        >
          {title}
        </Typography>
        {
          isAuthenticated &&
          <>
            <Tooltip title={contentIdx !== 0 ? 'Move content up' : ''}>
              <span>
                <IconButton
                  disabled={contentIdx === 0}
                  onClick={() => handleRecipeContentReorder(content.orderId - 1)}
                >
                  <KeyboardArrowUpIcon
                    sx={{
                      color: contentIdx === 0 ? CustomColorScheme['lightGray'] : CustomColorScheme['darkestBrown'],
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip
              title={contentIdx !== contentLastIdx ? 'Move content down' : ''}

            >
              <span>
                <IconButton
                  disabled={contentIdx === contentLastIdx}
                  onClick={() => handleRecipeContentReorder(content.orderId + 1)}
                >
                  <KeyboardArrowDownIcon
                    sx={{
                      color: contentIdx === contentLastIdx ? CustomColorScheme['lightGray'] : CustomColorScheme['darkestBrown'],
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title='Disconnect recipe content'>
              <IconButton
                onClick={() => setDeletionConfirmationDialogOpen(true)}
              >
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: CustomColorScheme['darkestBrown'],
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit recipe content'>
              <IconButton
                onClick={handleDialogOpen}
              >
                <EditIcon
                  fontSize='small'
                  sx={{
                    color: CustomColorScheme['darkestBrown'],
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        }
      </Stack >
    )
  }


  // renter ////////////////////

  return (
    <>
      <Paper
        elevation={0}
        // square
        sx={{
          '&.MuiPaper-root': {
            bgcolor: CustomColorScheme['tan'],
          }
        }}
      >
        {
          contentIdx === 0 &&
          <Stack direction='row'>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              color='inherit'
              sx={{
                "& .MuiTabs-indicator": {
                  bgcolor: CustomColorScheme['text']
                },
                marginBottom: .5,
              }}
            >
              <Tab
                label="Ingredients"
                index={0}
                sx={{
                  "&.Mui-selected": {
                    color: CustomColorScheme['black'],
                    fontWeight: 'bold',
                  }
                }}
              />
              <Tab
                label="Instructions"
                index={1}
                sx={{
                  "&.Mui-selected": {
                    color: CustomColorScheme['black'],
                    fontWeight: 'bold',
                  }
                }}
              />

            </Tabs>
            <Box
              display='flex'
              flexGrow={1}
              justifyContent='end'
            >
              {
                isAuthenticated &&
                <Tooltip title='Add recipe content'>
                  <IconButton
                    onClick={() => setContentSearchDialogOpen(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              }
            </Box>
          </Stack>
        }
        <TabPanel value={tabValue} index={0} >
          {/* INGREDIENTS */}
          <Title title={content.title} />
          {
            content.ingredients &&
            content.ingredients.replace('\r', '').split('\n').map((ingredient, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    bgcolor: CustomColorScheme['brightOrange'],
                    color: 'black',
                    paddingX: 1,
                    paddingY: ingredient.endsWith(":") ? 1.5 : 0.5,
                    fontSize: 16,
                    margin: 0,
                    borderTop: 2,
                    borderColor: CustomColorScheme['tan']
                  }}
                >
                  {
                    ingredient.endsWith(":")
                      ?
                      <Typography
                        variant='body1'
                        component='div'
                        paddingTop={.5}
                        fontWeight="450"
                      >
                        {ingredient.toUpperCase()}
                      </Typography>
                      : ingredient
                  }
                </Box>
              )
            })
          }
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {/* INSTRUCTIONS */}
          <Title title={content.title} />
          {
            content.instructions &&
            content.instructions.replace('\r', '').split('\n').map((instruction, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    bgcolor: CustomColorScheme['darkGreen'],
                    color: CustomColorScheme['white'],
                    paddingX: 1,
                    paddingY: instruction.endsWith(":") ? 1.5 : 0.5,
                    fontSize: 16,
                    margin: 0,
                    borderTop: 2,
                    borderColor: CustomColorScheme['tan']
                  }}
                >
                  {
                    instruction.endsWith(":")
                      ?
                      <Typography
                        variant='body1'
                        component='div'
                        color={CustomColorScheme['amber']}
                        paddingTop={.5}
                        fontWeight="425"
                      >
                        {instruction.toUpperCase()}
                      </Typography>
                      : instruction
                  }
                </Box>
              )
            })}
        </TabPanel>
        <DeleteConfirmationDialog
          message={`Remove "${content.title}" from this recipe?`}
          open={deletionConfirmationDialogOpen}
          setOpen={setDeletionConfirmationDialogOpen}
          onDelete={handleRecipeContentDelete}
        />
      </Paper>
    </>
  )

})
export default RecipeContent
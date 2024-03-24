// general
import '../App.css';
import 'react-medium-image-zoom/dist/styles.css'
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Parser } from "html-to-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from 'react-responsive'
import { useReactToPrint } from 'react-to-print';
import { useImageSize } from 'react-image-size';
import Zoom from 'react-medium-image-zoom'

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import FilterNoneIcon from '@mui/icons-material/FilterNone';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Copywrite from '../components/Copywrite';
import RecipeContent from '../components/RecipeContent';
import { RecipeContext } from '../components/AllContext';
import RecipePrintContent from './recipePrintContent';
import ContentDialog from '../components/dialogs/ContentDialog';
import ContentSearchDialog from '../components/dialogs/ContentSearchDialog';
import RecipeDialog from '../components/dialogs/RecipeDialog';
import { AuthContext } from '../AuthContext';


const ParsedText = (props) => {
  const { rawText } = props;
  const htmlParser = new Parser();

  return rawText && (
    <span
      {...props.children}
    >
      {
        rawText.split('\n').map((sentence, idx) => {
          let innerHtml = htmlParser.parse(sentence);
          return (
            <div key={idx}>{innerHtml}</div>
          )
        })
      }
    </span>
  )
}


////////////////////////


export default function Recipe(props) {

  const {
    recipeMap,
    setRecipeMap,
    getRecipeByRoute,
    updateRecipeContent,
    updateContent,
    updateRecipe,
    contentTitles,
    getSelectedContent,
    selectedContent,
    setSelectedContent,
    createRecipeContent,
    deleteRecipeContent,
    statusMessage,
    setStatusMessage,
    deleteRecipe,
  } = useContext(RecipeContext);


  // constants ///////////////

  const [tabValue, setTabValue] = useState(0);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [contentSearchDialogOpen, setContentSearchDialogOpen] = useState(false);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();
  const [imagefileUri, setImagefileUri] = useState();
  const [metaImage, setMetaImage] = useState();
  const [metaTitle, setMetaTitle] = useState();

  const isMobile = useMediaQuery({ query: '(max-width: 750px)' })
  const { isAuthenticated } = useContext(AuthContext)

  // useEffect ///////////////

  useEffect(() => {
    setRecipeMap(null);
    navigate('/recipe/' + route)
    getRecipeByRoute(route);
  }, []);

  useEffect(() => {
    if (statusMessage && statusMessage.route) {
      navigate(`/recipe/${statusMessage.route}`)
    }
  }, [statusMessage]);

  useEffect(() => {
    setImagefileUri(
      recipeMap && recipeMap.imageFile
        ? `${process.env.REACT_APP_IMAGE_BASE_URL + "/" + recipeMap.imageFile}`
        : null
    )
    setMetaImage(
      recipeMap && recipeMap.imageFile
        ? `${process.env.REACT_APP_IMAGE_BASE_URL + "/" + recipeMap.imageFile}`
        : `${"apple-touch-icon.png"}`
    )
    setMetaTitle
      (recipeMap && recipeMap.title
        ? recipeMap.title
        : "Michael's Recipes"
      )
  }, [recipeMap]);


  // constants ///////////////

  const { route } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef();
  const location = useLocation();

  const marginTop = "25px"
  const marginRight = "50px"
  const marginBottom = "50px"
  const marginLeft = "25px"

  const [imageDimensions] = useImageSize(imagefileUri);

  // event handlers //////////

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Recipe',
    pageStyle: `@media print{
      @page{
        margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
      }
    }`,
    onAfterPrint: () => console.log('PDF printed successfully'),
  });

  const handleUpdateContent = (contentObj) => {
    contentObj.route = route;
    updateContent(contentObj)
  }

  const handleUpdateRecipeContent = (recipeContentObj) => {
    updateRecipeContent({
      recipeId: recipeMap.recipeId,
      contentId: recipeContentObj.contentId,
      orderId: recipeContentObj.orderId,
      route: route,
    })
  }

  const handleCreateRecipeContent = (contentId) => {
    createRecipeContent({
      recipeId: recipeMap.recipeId,
      contentId: contentId,
      route: route,
    })
  }

  const handleDeleteRecipeContent = (contentId) => {
    deleteRecipeContent({
      recipeId: recipeMap.recipeId,
      contentId: contentId,
      route: route,
    })
  }

  const handleSnackbarTransition = (props) => {
    return <Slide {...props} direction="left" />;
  }

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(recipeMap.title + "\n" + window.location.href);
    setStatusMessage({
      status: "success",
      message: "Recipe Title and URL copied to the Clipboard"
    });
  }


  // render //////////////////


  return (
    <HelmetProvider>
      {
        recipeMap
          ?
          <>
            <Helmet prioritizeSeoTags>
              <title>{metaTitle}</title>
              <meta property="og:title" content={metaTitle} />
              <meta property="og:image" content={metaImage} />
              <meta property="og:url" content={location.pathname} />
            </Helmet>
            <Container
              maxWidth='false'
              disableGutters={isMobile}
              sx={{
                maxWidth: 900,
              }}
            >
              {/* tool bar */}
              <Stack
                direction="row"
                paddingY={1}
                marginRight={1}
                display='flex'
                alignItems='center'
              >
                <Box
                  display='flex'
                  flexGrow={1}
                  alignItems='center'
                />
                <span
                  style={{
                    paddingRight: 2,
                    paddingBottom: 4,
                    color: CustomColorScheme['white']
                  }}
                >
                  {"< "}
                </span>
                <Typography
                  variant='text'
                  sx={{
                    color: CustomColorScheme['lightTan'],
                    cursor: 'pointer',
                    paddingBottom: .5,
                    marginRight: 1,
                    ':hover': {
                      color: 'white',
                      fontWeight: 'bold,',
                      textDecoration: 'underline'
                    },
                  }}
                  onClick={() => {
                    setRecipeMap(null);
                    navigate("/")
                  }}
                >
                  return
                </Typography>
              </Stack>

              {/* recipe surface */}
              <Paper
                elevation={0}
                sx={{
                  padding: isMobile ? 1 : 4,
                  paddingTop: isMobile ? 1 : 2,
                  paddingBottom: isMobile ? 2.5 : 1,
                  margin: 1,
                  '&.MuiPaper-root': {
                    borderRadius: isMobile ? 0 : 5,
                    backgroundColor: CustomColorScheme['tan']
                  }
                }}
              >
                <Stack
                  direction='column'
                  width="100%"
                  spacing={2}
                >
                  {/* title and favorite icon */}
                  <Stack
                    direction='row'
                    width='100%'
                  >
                    <Box
                      width={100}
                    />
                    <Box
                      display='flex'
                      flexGrow={1}
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Tooltip title='Copy Title and URL to Clipboard'>
                        <IconButton
                          onClick={handleCopyTitle}
                        >
                          <FilterNoneIcon
                            sx={{
                              width: 18,
                              marginRight: 1,
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Typography
                        display='flex'
                        variant='h5'
                        component='div'
                        textAlign='center'
                      >
                        {recipeMap.title}
                        <Box
                          display='flex'
                          width={40}
                          alignItems='center'
                        >
                          {recipeMap.isFavorite &&

                            <Tooltip title='A favorite!'>
                              <FavoriteIcon
                                sx={{
                                  paddingLeft: 1,
                                  color: CustomColorScheme['darkRed'],
                                }}
                              />
                            </Tooltip>
                          }
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      width={100}
                      display='flex'
                      justifyContent='end'
                      alignItems='center'
                    >
                      <Tooltip title='Print this recipe!'>
                        <IconButton
                          onClick={handlePrint}
                          sx={{
                            ':hover': {
                              color: CustomColorScheme['white'],
                            },
                          }}
                        >
                          <PrintIcon />
                        </IconButton>
                      </Tooltip>
                      {
                        isAuthenticated &&
                        <Tooltip title='Edit this recipe'>
                          <IconButton
                            onClick={() => setRecipeDialogOpen(true)}
                          >
                            <EditIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      }
                    </Box>
                  </Stack>

                  {/* recipe image, description & notes */}
                  {
                    isMobile
                      ?
                      <>
                        {/* mobile  */}
                        {recipeMap.imageFile &&

                          <Zoom
                            classDialog="custom-zoom-thumb"

                          >
                            <img
                              src={imagefileUri}
                              width='100%'
                              height='auto'
                              style={{
                                borderRadius: 10,
                              }}
                            />
                          </Zoom>
                        }
                        {
                          recipeMap.photoCredit &&
                          <Typography
                            sx={{
                              display: 'flex',
                              flexGrow: 1,
                              alignItems: 'end',
                              padding: 0,
                              fontSize: 12,
                              color: CustomColorScheme['darkGreenBrown']
                            }}
                          >
                            photo credit: {recipeMap.photoCredit}
                          </Typography>
                        }

                        <Box
                          sx={{
                            '&.MuiBox-root a': {
                              color: CustomColorScheme['text'],
                            },
                          }}
                        >
                          <ParsedText
                            rawText={recipeMap.description}
                          />
                          {
                            recipeMap.note && (
                              <>
                                <br /><b>Note:</b>
                                <ParsedText
                                  rawText={recipeMap.note}
                                  sx={{
                                    marginTop: 0,
                                    color: CustomColorScheme['text']
                                  }}
                                />
                              </>
                            )}

                        </Box>

                      </>
                      :
                      // desktop
                      <Stack
                        direction='row'
                        spacing={4}
                      >
                        <Box
                          width='100%'
                          bgcolor={CustomColorScheme['mediumBrown']}
                          sx={{
                            borderRadius: 6,
                            '&.MuiBox-root a': {
                              color: CustomColorScheme['text'],
                            },
                          }}

                        >
                          <Stack
                            direction='row'
                          >
                            {
                              recipeMap.imageFile
                                ?
                                <Zoom
                                  classDialog="custom-zoom"
                                  zoomMargin={50}
                                  margin={0}
                                >
                                  <img
                                    src={imagefileUri}
                                    width={400}
                                    height={imageDimensions ? 400 / imageDimensions.width * imageDimensions.height : 'auto'}
                                    style={{
                                      borderTopLeftRadius: 20,
                                      borderBottomLeftRadius: 20,
                                      margin: 0,
                                      marginBottom: -4,
                                    }}
                                  />
                                </Zoom>
                                :
                                <Box
                                  width={400}
                                />
                            }
                            <Box
                              backgroundColor={CustomColorScheme['white']}
                              sx={{
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                              }}
                              width='100%'
                            >
                              <Stack
                                direction='column'
                                spacing={0}
                                height='100%'
                              >
                                <Box
                                  padding={1.5}
                                  sx={{
                                    borderTopRightRadius: 25,
                                  }}
                                >
                                  <ParsedText
                                    rawText={recipeMap.description}
                                  />
                                </Box>
                                {recipeMap.note && (
                                  <Box
                                    padding={1.5}
                                    sx={{
                                      borderBottomRightRadius: 25,
                                    }}

                                  >
                                    <Typography
                                      variant='body1'
                                      component='div'
                                      marginTop={1}
                                      fontSize={14}
                                      fontWeight='bold'
                                      color={CustomColorScheme['text']}
                                    >
                                      Note:
                                    </Typography>
                                    <ParsedText
                                      rawText={recipeMap.note}
                                      sx={{
                                        color: CustomColorScheme['text']
                                      }}
                                    />
                                  </Box>
                                )}
                                {
                                  recipeMap.photoCredit &&
                                  <Typography
                                    sx={{
                                      display: 'flex',
                                      flexGrow: 1,
                                      alignItems: 'end',
                                      padding: 1.5,
                                      fontSize: 12,
                                      color: CustomColorScheme['darkGreenBrown']
                                    }}
                                  >
                                    photo credit: {recipeMap.photoCredit}
                                  </Typography>
                                }
                              </Stack>
                            </Box>
                          </Stack>
                        </Box>
                      </Stack>
                  }

                  {/* recipe content */}
                  <Stack
                    spacing={3}
                  >
                    {
                      recipeMap.content &&
                      recipeMap.content.map((content, idx) => {
                        return (
                          <RecipeContent
                            key={idx}
                            contentIdx={idx}
                            contentLastIdx={recipeMap.content.length - 1}
                            content={content}
                            tabValue={tabValue}
                            setTabValue={setTabValue}
                            handleUpdateRecipeContent={handleUpdateRecipeContent}
                            setContentDialogOpen={setContentDialogOpen}
                            setContentSearchDialogOpen={setContentSearchDialogOpen}
                            setDialogContent={setDialogContent}
                            deleteRecipeContent={handleDeleteRecipeContent}
                          />
                        )
                      })
                    }
                  </Stack>

                </Stack>
              </Paper>
            </Container >
            <Snackbar
              open={statusMessage !== ''}
              onClose={() => setStatusMessage('')}
              autoHideDuration={statusMessage.status === "success" ? 3000 : 9000}
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
            <Box display='none'>
              <RecipePrintContent
                recipeMap={recipeMap}
                componentRef={componentRef}
              />
            </Box>
            <ContentDialog
              dialogOpen={contentDialogOpen}
              setDialogOpen={setContentDialogOpen}
              content={dialogContent}
              handleUpdateContent={handleUpdateContent}
              initialTabValue={tabValue}
            />
            <RecipeDialog
              dialogOpen={recipeDialogOpen}
              setDialogOpen={setRecipeDialogOpen}
              recipe={recipeMap}
              updateRecipe={updateRecipe}
              deleteRecipe={deleteRecipe}
            />
            <ContentSearchDialog
              dialogOpen={contentSearchDialogOpen}
              setDialogOpen={setContentSearchDialogOpen}
              initialTabValue={tabValue}
              contentTitles={contentTitles}
              getSelectedContent={getSelectedContent}
              selectedContent={selectedContent}
              setSelectedContent={setSelectedContent}
              createRecipeContent={handleCreateRecipeContent}
            />
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
      <Copywrite />
    </HelmetProvider >
  )
}
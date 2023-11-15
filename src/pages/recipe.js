// general
import '../App.css';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from "html-to-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from 'react-responsive'
import { useReactToPrint } from 'react-to-print';
import { useImageSize, getImageSize } from 'react-image-size';
import { useAuth0 } from "@auth0/auth0-react";

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

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import RecipeContent from '../components/RecipeContent';
import { RecipeContext } from '../components/AllContext';
import RecipePrintContent from './recipePrintContent';
import ContentDialog from '../components/dialogs/ContentDialog';
import ContentSearchDialog from '../components/dialogs/ContentSearchDialog';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';
import RecipeDialog from '../components/dialogs/RecipeDialog';
import { Button } from '@mui/material';

const ParsedText = (props) => {
    const { rawText } = props;
    const htmlParser = new Parser();

    return rawText && (
        <span>
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
    const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })
    const { isAuthenticated } = useAuth0();

    const [open, setOpen] = useState(false);

    // useEffect ///////////////

    useEffect(() => {
        getRecipeByRoute(route);
        navigate('/recipe/' + route)
    }, []);

    useEffect(() => {
        if (statusMessage && statusMessage.route) {
            navigate(`/recipe/${statusMessage.route}`)
        }
    }, [statusMessage]);


    // constants ///////////////

    const { route } = useParams();
    const navigate = useNavigate();
    const componentRef = useRef();

    const imagefileUri = recipeMap && (
        recipeMap.imageFile
        && (
            `${process.env.REACT_APP_API_IMAGE_URL + "/" + recipeMap.imageFile}`
        )
    )

    const [imageDimensions] = useImageSize(imagefileUri);


    // event handlers //////////

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Recipe',
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

    const handleRecipeDelete = () => {
        deleteRecipe(recipeMap.recipeId);
    }

    const handleSnackbarTransition = (props) => {
        return <Slide {...props} direction="left" />;
    }


    // render //////////////////

    return recipeMap && (
        <HelmetProvider>
            <Helmet>
                <title>{recipeMap && recipeMap.title}</title>
            </Helmet>
            <Appbar />
            <Container
                id='1d-2'
                maxWidth='false'
                disableGutters={isMobile}
                sx={{
                    maxWidth: 900,
                }}
            >
                {/* tool bar */}
                <Stack
                    id='1d-3'
                    direction="row"
                    paddingY={1}
                    marginRight={1}
                >
                    <Box
                        id='id-4'
                        display='flex'
                        flexGrow={1}
                    />
                    <Tooltip title='Delete this recipe'>
                        <IconButton
                            onClick={() => setDeleteConfirmationDialogOpen(true)}
                            sx={{
                                ':hover': {
                                    color: 'white',
                                },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Print this recipe!'>
                        <IconButton
                            onClick={handlePrint}
                            sx={{
                                ':hover': {
                                    color: 'white',
                                },
                            }}
                        >
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Return'>
                        <IconButton
                            onClick={() => {
                                navigate('/')
                            }}
                            sx={{
                                ':hover': {
                                    color: 'white',
                                },
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                {/* recipe surface */}
                <Paper
                    id='id-6'
                    elevation={0}
                    sx={{
                        padding: isMobile ? 1 : 4,
                        margin: 1,
                        '&.MuiPaper-root': {
                            borderRadius: 5,
                            backgroundColor: CustomColorScheme['tan']
                        }
                    }}
                >
                    <Stack
                        id='id-7'
                        direction='column'
                        width="100%"
                        spacing={2}
                    >
                        {/* title and favorite icon */}
                        <Stack
                            id='id-8'
                            direction='row'
                            width='100%'
                        >
                            <Box id='id-9' width={100} />
                            <Box
                                id='id-10'
                                display='flex'
                                height={37}
                                flexGrow={1}
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Typography
                                    id='id-11'
                                    display='flex'
                                    variant='h5'
                                    component='div'
                                    textAlign='center'
                                >
                                    {recipeMap.title}
                                </Typography>
                            </Box>
                            <Box
                                id='id-12'
                                width={100}
                                display='flex'
                                justifyContent='end'
                                alignItems='center'
                            >
                                {
                                    recipeMap.isFavorite &&
                                    <Tooltip title='A favorite!'>
                                        <FavoriteIcon
                                            id='id-13'
                                            sx={{
                                                color: CustomColorScheme['darkRed'],
                                            }}
                                        />
                                    </Tooltip>
                                }
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
                        {isMobile
                            ?
                            <>
                                {/* mobile  */}
                                {recipeMap.imageFile &&
                                    (
                                        <img
                                            src={imagefileUri}
                                            width='100%'
                                            height='auto'
                                            style={{
                                                borderRadius: 10,
                                            }}
                                        />
                                    )
                                }
                                <Box
                                    sx={{
                                        '&.MuiBox-root a': {
                                            color: CustomColorScheme['text'],
                                        },
                                    }}
                                >
                                    <ParsedText rawText={recipeMap.description} />
                                    {recipeMap.note && (
                                        <>
                                            <br /><b>Note:</b>
                                            <ParsedText
                                                id='id-23'
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
                                id='id-14'
                                direction='row'
                                spacing={4}
                            >
                                <Box
                                    id='id-15'
                                    width='100%'
                                    bgcolor='white'
                                    borderRadius={5}
                                    sx={{
                                        '&.MuiBox-root a': {
                                            color: CustomColorScheme['text'],
                                        },
                                    }}

                                >
                                    <Stack
                                        id='id-16'
                                        direction='row'
                                    >
                                        {recipeMap.imageFile &&
                                            (
                                                <img
                                                    id='id-17'
                                                    src={imagefileUri}
                                                    width={400}
                                                    height={imageDimensions ? 400 / imageDimensions.width * imageDimensions.height : 'auto'}
                                                    style={{
                                                        borderTopLeftRadius: 20,
                                                        borderBottomLeftRadius: 20,
                                                        margin: 0,
                                                    }}
                                                />
                                            )
                                        }
                                        <Stack
                                            id='id-18'
                                            direction='column'
                                            spacing={0}
                                        >
                                            <Box
                                                id='id-19'
                                                padding={1}
                                            >
                                                <ParsedText id='id-20' rawText={recipeMap.description} />
                                            </Box>
                                            {recipeMap.note && (
                                                <Box id='id-21' padding={1}>
                                                    <Typography
                                                        id='id-22'
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
                                                        id='id-23'
                                                        rawText={recipeMap.note}
                                                        sx={{
                                                            color: CustomColorScheme['text']
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        }

                        {/* recipe content */}
                        <Stack
                            spacing={3}
                        >
                            {
                                recipeMap.contents &&
                                recipeMap.contents.map((content, idx) => {
                                    return (
                                        <RecipeContent
                                            id={'id-2_' + idx}
                                            key={idx}
                                            contentIdx={idx}
                                            contentLastIdx={recipeMap.contents.length - 1}
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
            <Copywrite />
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
            <DeleteConfirmationDialog
                message={`Delete recipe "${recipeMap.title}"?`}
                open={deleteConfirmationDialogOpen}
                setOpen={setDeleteConfirmationDialogOpen}
                onDelete={handleRecipeDelete}
            />

        </HelmetProvider >
    )
}
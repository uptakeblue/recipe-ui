// general
import '../App.css';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from "html-to-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from 'react-responsive'
import { useReactToPrint } from 'react-to-print';
import { useImageSize, getImageSize } from 'react-image-size';

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import RecipeContent from '../components/RecipeContent';
import { RecipeContext } from '../components/AllContext';
import RecipePrintContent from './recipePrintContent';
import ContentDialog from '../components/dialogs/ContentDialog';

const ParsedText = (props) => {
    const { rawText } = props;
    const htmlParser = new Parser();

    let innerHtml;
    return rawText && (
        <span>
            {
                rawText.split('\n').map((sentence, idx) => {
                    innerHtml = htmlParser.parse(sentence);
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
        isAuthenticated,
        setIsAuthenticated,
        updateRecipeContent,
        updateContent,
    } = useContext(RecipeContext);

    const [tabValue, setTabValue] = useState(0);
    const [contentsDialogOpen, setContentsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState();

    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })

    // useEffect ///////////////

    useEffect(() => {
        getRecipeByRoute(urltitle);
        navigate('/recipe/' + urltitle)
    }, []);

    // constants ///////////////

    const { urltitle } = useParams();
    const navigate = useNavigate();
    const componentRef = useRef();

    const imagefile = recipeMap && (
        recipeMap.imageFile
        && (
            `${process.env.REACT_APP_API_IMAGE_URL + "/" + recipeMap.imageFile}`
        )
    )

    const [imageDimensions] = useImageSize(imagefile);

    // event handlers //////////

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Recipe',
        onAfterPrint: () => console.log('PDF printed successfully'),
    });

    const handleUpdateRecipeContent = (recipeContentObj) => {
        updateRecipeContent({
            recipeId: recipeMap.recipeId,
            contentId: recipeContentObj.contentId,
            orderId: recipeContentObj.orderId,
            routeUrl: urltitle,
        })
    }

    const handleUpdateContent = (contentObj) => {
        contentObj.routeUrl = urltitle;
        updateContent(contentObj)
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
                    marginRight={2}
                >
                    <Box
                        id='id-4'
                        display='flex'
                        flexGrow={1}
                    />
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
                                    isAuthenticated &&
                                    <Tooltip title='Exit yhis recipe'>
                                        <IconButton>
                                            <EditIcon fontSize='small' />
                                        </IconButton>
                                    </Tooltip>
                                }
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
                                            src={imagefile}
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
                                                    src={imagefile}
                                                    width={400}
                                                    // height='auto'
                                                    height={imageDimensions ? 400 / imageDimensions.width * imageDimensions.height : 'auto'}
                                                    style={{
                                                        borderTopLeftRadius: 20,
                                                        borderBottomLeftRadius: 20,
                                                        marginRight: 10,
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
                                            isAuthenticated={isAuthenticated}
                                            handleUpdateRecipeContent={handleUpdateRecipeContent}
                                            contentsDialogOpen={contentsDialogOpen}
                                            setContentsDialogOpen={setContentsDialogOpen}
                                            dialogContent={dialogContent}
                                            setDialogContent={setDialogContent}
                                        />
                                    )
                                })
                            }
                        </Stack>

                    </Stack>

                </Paper>
            </Container >
            <Copywrite />
            <Box display='none'>
                <RecipePrintContent
                    recipeMap={recipeMap}
                    componentRef={componentRef}
                />
            </Box>
            <ContentDialog
                dialogOpen={contentsDialogOpen}
                setDialogOpen={setContentsDialogOpen}
                content={dialogContent}
                handleUpdateContent={handleUpdateContent}
            />
        </HelmetProvider >
    )
}
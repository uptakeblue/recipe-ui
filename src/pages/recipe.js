// general
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from "html-to-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from 'react-responsive'

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

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import RecipeContent from '../components/RecipeContent';
import { RecipeContext } from '../components/AllContext';

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
    } = useContext(RecipeContext);

    const [tabValue, setTabValue] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })

    // useEffect ///////////////

    useEffect(() => {
        getRecipeByRoute(urltitle);
        navigate('/recipe/' + urltitle)
    }, []);

    // constants ///////////////

    const { urltitle } = useParams();
    const navigate = useNavigate();

    const imagefile = recipeMap && (
        recipeMap.imageFile
        && (
            `${process.env.PUBLIC_URL + "/images/" + recipeMap.imageFile}`
        )
    )


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
                    <Tooltip title='Navigate to Printer Page'>
                        <IconButton
                            onClick={() => {
                                navigate('/recipeprint')
                            }}
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
                            <Box id='id-9' width={50} />
                            <Box
                                id='id-10'
                                display='flex'
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
                            <Box id='id-12' width={50}>
                                {
                                    recipeMap.isFavorite &&
                                    <FavoriteIcon
                                        id='id-13'
                                        fontSize='large'
                                        sx={{
                                            color: CustomColorScheme['darkRed'],
                                        }}
                                    />
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
                                            id='id-17'
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
                                    <ParsedText id='id-20' rawText={recipeMap.description} />
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
                                                    width='50%'
                                                    height='auto'
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
                                            content={content}
                                            tabValue={tabValue}
                                            setTabValue={setTabValue}
                                        />
                                    )
                                })
                            }
                        </Stack>

                    </Stack>

                </Paper>
            </Container >
            <Copywrite />
        </HelmetProvider>
    )
}
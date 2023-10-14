// general
import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from "html-to-react";

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import RecipeContent from '../components/RecipeContent';

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
        getRecipeByRoute
    } = props;

    const [tabValue, setTabValue] = useState(0);
    // useEffect ///////////////

    useEffect(() => {
        getRecipeByRoute(urltitle);
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
        <>
            <Appbar />
            <Container
                maxWidth='false'
                sx={{
                    maxWidth: 1050,
                }}
            >
                <Stack
                    direction="row"
                    paddingY={1}
                    marginRight={2}
                >
                    <Box
                        display='flex'
                        flexGrow={1}
                    />
                    <Button
                        variant='outlined'
                        sx={{
                            '&.MuiButton-outlined': {
                                color: CustomColorScheme['mediumBrown'],
                                borderColor: CustomColorScheme['mediumBrown'],
                            },
                            '&.MuiButton-outlined:hover': {
                                color: CustomColorScheme['weekend'],
                                borderColor: CustomColorScheme['weekend'],
                            },
                        }}
                        onClick={() => {
                            navigate('/')
                        }}
                    >Return</Button>
                </Stack>
                <Paper
                    elevation={0}
                    sx={{
                        padding: 4,
                        margin: 1,
                        '&.MuiPaper-root': {
                            borderRadius: 5,
                            backgroundColor: CustomColorScheme['weekend']
                        }
                    }}
                >
                    <Stack
                        direction='column'
                        width="100%"
                        spacing={2}
                    >
                        <Stack
                            direction='row'
                            width='100%'
                        >
                            <Box width={50} />
                            <Box
                                display='flex'
                                flexGrow={1}
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Typography
                                    display='flex'
                                    variant='h5'
                                    component='div'
                                    textAlign='center'
                                >
                                    {recipeMap.title}
                                </Typography>
                            </Box>
                            <Box width={50}>
                                {
                                    recipeMap.isFavorite &&
                                    <FavoriteIcon
                                        fontSize='large'
                                        sx={{
                                            color: CustomColorScheme['darkRed'],
                                        }}
                                    />
                                }

                            </Box>
                        </Stack>
                        <Stack
                            direction='row'
                            spacing={4}
                        >
                            {recipeMap.imageFile &&
                                (<Box
                                    width='50%'
                                >
                                    <img
                                        src={imagefile}
                                        width='100%'
                                        height='auto'
                                        style={{
                                            borderRadius: 20,
                                        }}
                                    />
                                </Box>)
                            }
                            <Box
                                width={recipeMap.imageFile ? '50%' : "100%"}
                                padding={2}
                                paddingY={2}
                                bgcolor='white'
                                borderRadius={5}
                                sx={{
                                    '&.MuiBox-root a': {
                                        color: CustomColorScheme['text'],
                                    },
                                }}

                            >
                                <Stack
                                    direction='column'
                                    spacing={0}
                                >
                                    <ParsedText
                                        rawText={recipeMap.description}
                                    />
                                    {recipeMap.note && (
                                        <>
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
                                        </>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack
                            spacing={3}
                        >
                            {
                                recipeMap.contents.map((content, idx) => {
                                    return (
                                        <RecipeContent
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
        </>
    )
}
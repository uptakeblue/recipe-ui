// general
import '../App.css';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from "html-to-react";

// material ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Paper } from '@mui/material';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import RecipeCard from '../components/RecipeCard';

const ParsedText = (props) => {
    const { rawText } = props;
    const htmlParser = new Parser();

    let innerHtml = htmlParser.parse(rawText);
    return (
        rawText
            ?
            <div>
                {innerHtml}
            </div>
            :
            <></>
    )
}


export default function Recipe(props) {
    const {
        recipeMap,
        getRecipeByRoute
    } = props;

    const { urltitle } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRecipeByRoute(urltitle);
    }, []);

    const imagefile = recipeMap.imageFile
        ? `url("${process.env.PUBLIC_URL + "/images/" + recipeMap.imageFile}")`
        : `url("${process.env.PUBLIC_URL + "/orange-panel.png"}")`


    return (
        <>
            <Appbar />
            <Container
                maxWidth='false'
                sx={{
                    maxWidth: 950,
                }}
            >
                <Stack
                    direction="row"
                    paddingY={1}
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
                        onClick={() => navigate('/')}
                    >Return</Button>
                </Stack>
                <Paper
                    elevation={0}
                    sx={{
                        padding: 4,
                        margin: 1,
                        minHeight: 800,
                        width: 900,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
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
                        <Typography
                            variant='h5'
                            component='div'
                            textAlign='center'
                        >
                            {recipeMap && <div>{recipeMap.title}</div>}
                        </Typography>
                        <Stack
                            direction='row'
                            spacing={4}
                        >
                            <Box
                                width={425}
                                height={570}
                                // border={1}
                                sx={{
                                    background: imagefile,
                                    backgroundSize: 425,
                                    backgroundRepeat: "no-repeat",
                                }}
                            ></Box>
                            <Box width={425}>
                                <Stack
                                    direction='column'
                                    spacing={1}
                                >
                                    <ParsedText rawText={recipeMap.description} />
                                    <ParsedText rawText={recipeMap.note} />
                                </Stack>
                            </Box>
                        </Stack>

                        <Box
                            display='flex'
                            flexGrow={1}
                            height={200}
                            border={1}
                        />

                    </Stack>

                </Paper>
            </Container >
            <Copywrite />
        </>
    )
}
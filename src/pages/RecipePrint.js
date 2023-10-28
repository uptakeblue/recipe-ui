// general
import '../App.css';
import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Parser } from "html-to-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useReactToPrint } from 'react-to-print';

// material ui
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrintIcon from '@mui/icons-material/Print';

// components
import Appbar from '../components/Appbar';
import Copywrite from '../components/Copywrite';
import { RecipePrintContext } from '../components/AllContext';

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
                        <span key={idx}>{innerHtml}</span>
                    )
                })
            }
        </span>
    )
}

////////////////////////


export default function RecipePrint(props) {

    const {
        recipeMap,
    } = useContext(RecipePrintContext)

    // constants //////////////

    const componentRef = useRef();
    const navigate = useNavigate();

    const imagefile = recipeMap && (
        recipeMap.imageFile
        && (
            `${process.env.PUBLIC_URL + "/images/" + recipeMap.imageFile}`
        )
    )

    // event handlers /////////

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Recipe',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    });

    // render //////////////////

    return recipeMap && (
        <HelmetProvider>
            <Helmet>
                <title>{recipeMap && 'Print: ' + recipeMap.title}</title>
            </Helmet>
            <Appbar />
            <Container
                ref={componentRef}
                id='1d-2'
                maxWidth='false'
                sx={{
                    maxWidth: 1050,
                }}
            >
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
                    <Tooltip title='Print This Page!'>
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
                                navigate(`/recipe/${recipeMap.urlRoute}`)
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

                <Paper
                    id='id-6'
                    elevation={0}
                    sx={{
                        padding: 4,
                        margin: 1,
                    }}
                >
                    <Stack
                        id='id-7'
                        direction='column'
                        width="100%"
                        spacing={2}
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
                        <Box
                            id='id-19'
                        >
                            <ParsedText id='id-20' rawText={recipeMap.description} />
                        </Box>
                        {recipeMap.note && (
                            <>
                                <div style={{ fontWeight: 'bold', }}>
                                    Note:
                                </div>
                                <ParsedText
                                    id='id-23'
                                    rawText={recipeMap.note}
                                />
                            </>
                        )}
                        {recipeMap.imageFile &&
                            (
                                <img
                                    id='id-17'
                                    src={imagefile}
                                    width='33%'
                                    height='auto'
                                />
                            )
                        }

                        <Stack
                            spacing={3}
                        >
                            {
                                recipeMap.contents.map((content, cidx) => {
                                    return (
                                        <div key={cidx}>
                                            <Box
                                                sx={{
                                                    fontWeight: 'bold',
                                                    margin: 0,
                                                }}>{content.title}<br />Ingredients:</Box>
                                            <Box
                                                sx={{
                                                    paddingLeft: 2,
                                                    margin: 0,
                                                }}>
                                                {content.ingredients.split('\n').map((ingredient, idx) => {
                                                    return ingredient && (
                                                        <li key={idx}
                                                            style={{
                                                                margin: 0,
                                                                paddingY: 0,
                                                            }}>{ingredient}</li>
                                                    )
                                                })}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: 'bold',
                                                    margin: 0,
                                                    marginTop: 2,
                                                    borderBottom: 1,
                                                }}>Instructions:</Box>
                                            {content.instructions.split('\n').map((instruction, idx) => {
                                                return instruction && (
                                                    <Box key={idx}
                                                        sx={{
                                                            paddingY: 0.5,
                                                            borderBottom: 1,
                                                        }}
                                                    >{instruction}</Box>
                                                )
                                            })}
                                        </div>
                                    )
                                })
                            }
                        </Stack>

                    </Stack>

                </Paper>
            </Container >
            <Copywrite />
        </HelmetProvider >
    )
}
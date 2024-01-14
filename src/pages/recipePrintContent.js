// general
import '../App.css';
import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Parser } from "html-to-react";
import { useReactToPrint } from 'react-to-print';

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// components
import { RecipePrintContext } from '../components/AllContext';

const ParsedText = (props) => {
    const { rawText } = props;
    const htmlParser = new Parser();

    return rawText && (
        <span>
            {
                rawText.split('\n').map((sentence, idx) => {
                    let innerHtml = htmlParser.parse(sentence);
                    return (
                        <span key={idx}>{innerHtml}</span>
                    )
                })
            }
        </span>
    )
}

////////////////////////


export default function RecipePrintContent(props) {
    const {
        recipeMap,
        componentRef
    } = props;

    // const {
    //     recipeMap,
    // } = useContext(RecipePrintContext)

    // constants //////////////

    const navigate = useNavigate();

    const imagefile = recipeMap && (
        recipeMap.imageFile
        && (
            `${process.env.REACT_APP_API_IMAGE_URL + "/" + recipeMap.imageFile}`
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
        <Paper
            ref={componentRef}
            elevation={0}
            sx={{
                padding: 4,
                margin: 1,
            }}
        >
            <Stack
                direction='column'
                width="100%"
                spacing={2}
            >
                <Typography
                    display='flex'
                    variant='h5'
                    component='div'
                    textAlign='center'
                >
                    {recipeMap.title}
                </Typography>
                <Box>
                    <ParsedText
                        rawText={recipeMap.description}
                    />
                </Box>
                {recipeMap.note && (
                    <>
                        <div style={{ fontWeight: 'bold', }}>
                            Note:
                        </div>
                        <ParsedText
                            rawText={recipeMap.note}
                        />
                    </>
                )}
                {recipeMap.imageFile &&
                    (
                        <img
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
                        recipeMap.contents &&
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
                                        {
                                            content.ingredients &&
                                            content.ingredients.split('\n').map((ingredient, idx) => {
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
                                    {
                                        content.instructions &&
                                        content.instructions.split('\n').map((instruction, idx) => {
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
    )
}
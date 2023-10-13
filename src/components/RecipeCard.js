// general
import '../App.css';
import React, { useState } from 'react';
import { Parser } from "html-to-react";

// material ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';

// components
import { CustomColorScheme } from '../components/CustomTheme';

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: CustomColorScheme['text'],
}));

const StyledLinkButton = styled(Typography)(({ theme }) => ({
    '&.MuiTypography-root,  &.MuiTypography-root:hover': {
        cursor: 'pointer',
        variant: 'body1',
        component: 'div',
        lineHeight: 'normal',
    },
    '&.MuiTypography-root:hover': {
        textDecoration: 'underline',
    },
}));

const RecipeNote = (props) => {
    const htmlParser = new Parser();
    let innerHtml = htmlParser.parse(props.rawText);
    return (
        props.rawText
            ?
            <div>
                {innerHtml}
            </div>
            :
            <></>
    )
}

////////////////////////


export default function RecipeCard(props) {
    const { recipe } = props;


    let imagefile = recipe.imageFile
        ? `url("${process.env.PUBLIC_URL + "/images/" + recipe.imageFile}")`
        : "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')";
    // : null;
    return (
        <Grid item >
            <Paper
                sx={{
                    height: 239,
                    width: 276,
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'end',
                    background: imagefile,
                    backgroundSize: 276,
                    backgroundRepeat: "no-repeat",
                    position: 'relative'
                }}
            >
                {recipe.isFavorite &&
                    <div style={{ position: 'absolute', top: 5, right: 5, zIndex: 1000 }}>
                        <Tooltip title='Always a Favorite!'>
                            <FavoriteIcon
                                fontSize='small'
                                sx={{
                                    color: CustomColorScheme['darkRed'],
                                }}
                            />
                        </Tooltip>
                    </div>}
                <Box
                    width={276}
                    height={100}
                    bgcolor={CustomColorScheme['weekend']}
                    paddingBottom={0.5}
                    overflow='hidden'
                >
                    <StyledLinkButton
                        padding={1}
                        paddingBottom={0.5}
                        fontWeight='bold'
                        sx={{
                            fontSize: 16,
                            color: CustomColorScheme['text'],
                        }}
                    >
                        {recipe.title}
                    </StyledLinkButton>
                    <Typography
                        variant='body2'
                        component={'div'}
                        padding={1}
                        paddingTop={0}
                        sx={{
                            fontSize: 12,
                            color: CustomColorScheme['text'],
                            '& a': {
                                color: CustomColorScheme['text'],
                                fontWeight: 'bold',
                            }
                        }}
                    >
                        <RecipeNote rawText={recipe.description} />
                    </Typography>

                </Box>
            </Paper>
        </Grid>
    )

}

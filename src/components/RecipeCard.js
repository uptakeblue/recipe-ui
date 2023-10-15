// general
import '../App.css';
import React from 'react';
import { Parser } from "html-to-react";
import { useNavigate } from 'react-router-dom';

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

////////////////////////


export default function RecipeCard(props) {
    const { recipe } = props;

    const navigate = useNavigate();

    let imagefile = recipe.imageFile
        ? `url("${process.env.PUBLIC_URL + "/images/" + recipe.imageFile}")`
        : `url("${process.env.PUBLIC_URL + "/orange-panel.png"}")`
    return (
        <Grid item key={recipe.recipeId} >
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
                    position: 'relative',
                    '&.MuiPaper-root': {
                        borderRadius: 5,
                    }
                }}
                onClick={() => navigate(`/recipe/${recipe.urlRoute}`)}
            >
                {recipe.isFavorite &&
                    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
                        <Tooltip title='Always a Favorite!'>
                            <FavoriteIcon
                                fontSize='small'
                                sx={{
                                    color: CustomColorScheme['darkRed'],
                                }}
                            />
                        </Tooltip>
                    </div>
                }
                <Box
                    width={276}
                    height={100}
                    bgcolor={CustomColorScheme['lightTan']}
                    paddingBottom={0.5}
                    overflow='hidden'
                    sx={{
                        '&.MuiBox-root': {
                            borderRadius: 5,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <StyledLinkButton
                        paddingTop={0.75}
                        paddingX={1.5}
                        fontWeight='bold'
                        sx={{
                            fontSize: 16,
                            color: CustomColorScheme['text'],
                        }}
                        onClick={() => navigate(`/recipe/${recipe.urlRoute}`)}
                    >
                        {recipe.title}
                    </StyledLinkButton>
                    <Typography
                        variant='body2'
                        component={'div'}
                        padding={1.5}
                        paddingTop={0.5}
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

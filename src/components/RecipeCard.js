// general
import '../App.css';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// material ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
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

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: CustomColorScheme['text'],
}));

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
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Box
                    width={276}
                    height={100}
                    bgcolor={CustomColorScheme['weekend']}
                    paddingBottom={0.5}
                    overflow='hidden'
                >
                    <Typography
                        variant='body2'
                        component={'div'}
                        padding={1}
                        paddingBottom={0}
                        sx={{
                            fontSize: 16,
                            color: CustomColorScheme['text'],
                        }}
                    >
                        {recipe.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        component={'div'}
                        padding={1}
                        paddingTop={0.5}
                        sx={{
                            fontSize: 12,
                            color: CustomColorScheme['text'],
                        }}
                    >
                        {recipe.note}
                    </Typography>

                </Box>
            </Paper>
        </Grid>
    )

}

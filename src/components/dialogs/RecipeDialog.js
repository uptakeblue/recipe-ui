// general
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'

// material ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import { Paper, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

// custom components
import { CustomColorScheme } from '../CustomTheme';

////////////////////////////////


const RecipeDialog = (props) => {
    const {
        dialogOpen,
        setDialogOpen,
        recipe,
    } = props;

    // constants////////////////

    const [title, setTitle] = useState('');
    const [recipeId, setRecipeId] = useState();
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [imageFile, setImageFile] = useState(false);
    const [urlRoute, setUrlRoute] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const [isTitleError, setIsTitleError] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })


    // event handlers //////////

    const handleTitleChange = (event) => {
        let t = event.currentTarget.value;
        setTitle(t);
        setIsTitleError(!t);
    }


    // useEffect ///////////////

    useEffect(() => {
        if (!dialogOpen) {
            setTitle('');
            setDescription('');
            setNote('');
            setImageFile('');
            setUrlRoute('');
            setIsFavorite(false);
            setRecipeId(null);
        } else {
            setTitle(recipe.title);
            setDescription(recipe.description);
            setNote(recipe.note);
            setImageFile(recipe.imageFile);
            setUrlRoute(recipe.urlRoute);
            setIsFavorite(recipe.isFavorite);
            setRecipeId(recipe.recipeId);
        }
        setIsTitleError(false);
    }, [dialogOpen]);


    // render //////////////////

    return (
        <>
            {
                recipe &&
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    maxWidth='xl'         >
                    <Box
                        width={isMobile ? 350 : 500}
                    >
                        <Box
                            bgcolor={CustomColorScheme['text']}
                            color={CustomColorScheme['white']}
                            paddingY={1}
                            paddingX={2.5}
                        >
                            Edit Recipe Content
                        </Box>

                        <Paper
                            sx={{
                                padding: 2,
                                bgcolor: CustomColorScheme['lightTan'],
                                width: isMobile ? '85%' : 'auto',
                            }}
                        >
                            <Stack spacing={1}>
                                <FormControl
                                    error={isTitleError}
                                >
                                    <TextField
                                        value={title}
                                        onChange={handleTitleChange}
                                        label="Title"
                                        variant='standard'
                                        error={isTitleError}
                                        padding={1}
                                        InputLabelProps={{
                                            shrink: true,
                                            sx: {
                                                marginLeft: 1,
                                                marginTop: 0.5,
                                            }
                                        }}
                                        sx={{
                                            backgroundColor: CustomColorScheme['white'],
                                            padding: 1,
                                        }}
                                    />
                                    {
                                        isTitleError &&
                                        <FormHelperText>Title is required</FormHelperText>
                                    }
                                </FormControl>

                            </Stack>
                            <Stack
                                direction='row'
                                spacing={1}
                                justifyContent='end'
                            >
                                <Button
                                    variant='outlined'
                                    sx={{
                                        color: CustomColorScheme['text'],
                                        borderColor: CustomColorScheme['text'],
                                        '&:hover': {
                                            color: green[600],
                                            borderColor: green[600],
                                        }
                                    }}
                                // onClick={handleContentSave}
                                >Save
                                </Button>
                                <Button
                                    sx={{
                                        color: CustomColorScheme['text'],
                                    }}
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Return
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                </Dialog >
            }
        </>
    )
}

export default RecipeDialog;
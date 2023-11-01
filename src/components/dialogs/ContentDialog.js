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


const ContentDialog = (props) => {
    const {
        dialogOpen,
        setDialogOpen,
        content,
        handleUpdateContent,
    } = props;

    // constants////////////////

    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [isTitleError, setIsTitleError] = useState(false);
    const [isInstructionsError, setIsInstructionsError] = useState(false);
    const [isIngredientsError, setIsIngredientsError] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })


    // event handlers //////////

    const handleTitleChange = (event) => {
        let t = event.currentTarget.value;
        setTitle(t);
        setIsTitleError(!t);
    }

    const handleIngredientsChange = (event) => {
        let t = event.currentTarget.value;
        setIngredients(t);
        setIsIngredientsError(!t);
    }

    const handleTInstructionsChange = (event) => {
        let t = event.currentTarget.value;
        setInstructions(t);
        setIsInstructionsError(!t);
    }

    const handleContentSave = () => {

        if (!title) {
            setIsTitleError(true)
        }
        if (!ingredients) {
            setIsIngredientsError(true)
        }
        if (!ingredients) {
            setIsIngredientsError(true)
        }
        if (!isTitleError && !isIngredientsError && !isInstructionsError) {
            handleUpdateContent({
                contentId: content.contentId,
                title: title,
                ingredients: ingredients,
                instructions: instructions,
                routeUrl: '',
            })
            setDialogOpen(false);
        }
    }


    // useEffect ///////////////

    useEffect(() => {
        if (!dialogOpen) {
            setTitle('');
            setIngredients('');
            setInstructions('');
        } else {
            setTitle(content.title);
            setIngredients(content.ingredients);
            setInstructions(content.instructions);
        }
        setIsTitleError(false);
        setIsIngredientsError(false);
        setIsInstructionsError(false);
    }, [dialogOpen]);


    // render //////////////////

    return (
        <>
            {
                content &&
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    maxWidth='xl'         >
                    <Box
                        width={isMobile ? 350 : 700}
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
                                <Tabs
                                    value={tabValue}
                                    onChange={(e, newValue) => setTabValue(newValue)}
                                    textColor='inherit'
                                    sx={{
                                        "& .MuiTabs-indicator": {
                                            bgcolor: CustomColorScheme['text']
                                        },
                                    }}
                                >
                                    <Tab
                                        label="Ingredients"
                                        index={0}
                                    />
                                    <Tab
                                        label="Instructions"
                                        index={1}
                                    />

                                </Tabs>
                                <FormControl
                                    error={isIngredientsError}
                                    sx={{
                                        display: tabValue === 0 ? 'flex' : 'none',
                                    }}
                                >
                                    <Box></Box>
                                    <TextField
                                        value={ingredients}
                                        onChange={handleIngredientsChange}
                                        label='Ingredients'
                                        variant='standard'
                                        multiline
                                        minRows={8}
                                        error={isIngredientsError}
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
                                            marginBottom: 1,
                                        }}
                                    />
                                    {
                                        isIngredientsError &&
                                        <FormHelperText>Ingredients are required</FormHelperText>
                                    }
                                </FormControl>
                                <FormControl
                                    error={isInstructionsError}
                                    sx={{
                                        display: tabValue === 1 ? 'flex' : 'none',
                                    }}
                                >
                                    <Box></Box>
                                    <TextField
                                        value={instructions}
                                        onChange={handleTInstructionsChange}
                                        label='Instructions'
                                        variant='standard'
                                        multiline
                                        minRows={8}
                                        error={isInstructionsError}
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
                                            marginBottom: 1,
                                        }}
                                    />
                                    {
                                        isInstructionsError &&
                                        <FormHelperText>Instructions are required</FormHelperText>
                                    }
                                </FormControl>
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
                                        onClick={handleContentSave}
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
                            </Stack>
                        </Paper>
                    </Box>
                </Dialog >
            }
        </>
    )
}
export default ContentDialog;
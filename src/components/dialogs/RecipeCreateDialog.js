// general
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'

// material ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import { IconButton, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

// icons
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


// custom components
import { CustomColorScheme } from '../CustomTheme';

////////////////////////////////


const RecipeCreateDialog = (props) => {
    const {
        dialogOpen,
        setDialogOpen,
        createRecipe,
    } = props;

    // constants////////////////

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [previewFile, setPreviewFile] = useState(false);
    const [previewFileUri, setPreviewFileUri] = useState(false);
    const [previewFileName, setPreviewFileName] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const [tabValue, setTabValue] = useState(0);

    const [isTitleError, setIsTitleError] = useState(false);
    const [isIngredientsError, setIsIngredientsError] = useState(false);
    const [isInstructionsError, setIsInstructionsError] = useState(false);

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

    const handleInstructionsChange = (event) => {
        let t = event.currentTarget.value;
        setInstructions(t);
        setIsInstructionsError(!t);
    }

    const handleFilePreview = (event) => {
        if (event.target.files[0]) {
            let file = event.target.files[0]
            setPreviewFileName(file.name);
            setPreviewFile(file);
            setPreviewFileUri(URL.createObjectURL(file))
        } else {
            setPreviewFile(null);
        }
    }

    const handleImageClear = () => {
        setPreviewFileUri(null);
    }

    const handleCreateRecipe = () => {
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

            let formData = new FormData();
            if (previewFile) {
                formData.append('file', previewFile);
            }
            formData.append('title', title);
            formData.append('description', description);
            formData.append('note', note);
            formData.append('favorite', isFavorite);
            formData.append('ingredients', ingredients);
            formData.append('instructions', instructions);

            createRecipe(formData);
            setDialogOpen(false);
        }
    }

    // useEffect ///////////////

    useEffect(() => {
        setTitle('');
        setDescription('');
        setNote('');
        setIngredients('');
        setInstructions('');
        setIsFavorite(false);
        setPreviewFileUri(null);
        setPreviewFile(null);
        setPreviewFileName(null);
        setIsTitleError(false);
        setIsIngredientsError(false);
        setIsInstructionsError(false);
    }, [dialogOpen]);


    // render //////////////////

    return (
        <>
            {
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
                            Create A Recipe
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
                                            '& .MuiInput-input': {
                                                fontFamily: 'monospace',
                                                color: 'darkblue',
                                            }
                                        }}
                                    />
                                    {
                                        isTitleError &&
                                        <FormHelperText>Title is required</FormHelperText>
                                    }
                                </FormControl>
                                <Stack direction='row' spacing={1}>
                                    {
                                        previewFileUri &&
                                        <Stack>
                                            <img
                                                src={previewFileUri}
                                                width={isMobile ? 250 : 350}
                                                height='auto'
                                                border='none'
                                                style={{
                                                    borderRadius: 10,
                                                }}
                                            />
                                            <Typography
                                                variant='body1'
                                                component='div'
                                                fontSize={14}
                                                fontWeight='bold'
                                                paddingY={1}
                                            >
                                                {previewFileName}
                                            </Typography>
                                        </Stack>
                                    }
                                    <Box
                                        display='flex'
                                        flexGrow={1}
                                        justifyContent='end'
                                        alignItems='center'
                                    >
                                        <Stack>
                                            <input
                                                id="image-select"
                                                style={{
                                                    display: "none"
                                                }}
                                                type="file"
                                                onChange={handleFilePreview}
                                                name="file"
                                            />
                                            <Tooltip title='Browse for an image file' >
                                                <label htmlFor='image-select'>
                                                    <IconButton
                                                        component="span"
                                                    >
                                                        <ImageSearchIcon />
                                                    </IconButton>
                                                </label>
                                            </Tooltip>
                                            {
                                                previewFileUri &&
                                                <Tooltip title='Clear image file' >
                                                    <IconButton
                                                        onClick={handleImageClear}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        </Stack>
                                    </Box>
                                </Stack>
                                <TextField
                                    value={description}
                                    onChange={(e) => setDescription(e.currentTarget.value)}
                                    label="Description"
                                    variant='standard'
                                    padding={1}
                                    multiline
                                    minRows={3}
                                    maxRows={5}
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
                                        fontFamily: 'Times New Roman',
                                        '& .MuiInput-input': {
                                            fontFamily: 'monospace',
                                            lineHeight: 1.25,
                                            color: 'darkblue',
                                        }
                                    }}
                                />
                                <TextField
                                    value={note}
                                    onChange={(e) => setNote(e.currentTarget.value)}
                                    label="Note"
                                    variant='standard'
                                    multiline
                                    minRows={4}
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
                                        '& .MuiInput-input': {
                                            fontFamily: 'monospace',
                                            lineHeight: 1.25,
                                            color: 'darkblue',
                                        }
                                    }}
                                />

                            </Stack>
                            <Tabs
                                value={tabValue}
                                onChange={(e, newValue) => setTabValue(newValue)}
                                color='inherit'
                                sx={{
                                    "& .MuiTabs-indicator": {
                                        bgcolor: CustomColorScheme['text']
                                    },
                                }}
                            >
                                <Tab
                                    label="Ingredients"
                                    index={0}
                                    sx={{
                                        "&.Mui-selected": {
                                            color: CustomColorScheme['black'],
                                            fontWeight: 'bold',
                                        }
                                    }}
                                />
                                <Tab
                                    label="Instructions"
                                    index={1}
                                    sx={{
                                        "&.Mui-selected": {
                                            color: CustomColorScheme['black'],
                                            fontWeight: 'bold',
                                        }
                                    }}
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
                                    onChange={handleInstructionsChange}
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
                                marginTop={1}
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
                                    onClick={handleCreateRecipe}
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

export default RecipeCreateDialog;
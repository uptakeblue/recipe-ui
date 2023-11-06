// general
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'

// material ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

// custom components
import { CustomColorScheme } from '../CustomTheme';


////////////////////////////////


const ContentSearchDialog = (props) => {
    const {
        dialogOpen,
        setDialogOpen,
        initialTabValue,
        contentTitles,
        getSelectedContent,
        selectedContent,
        setSelectedContent,
        createRecipeContent,
    } = props;

    // constants////////////////

    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const [selection, setSelection] = React.useState({ title: '', contentId: 0 });


    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })


    // event handlers //////////

    const handleSelectContent = (event, selection) => {
        setSelection(selection);
        if (selection) {
            getSelectedContent(selection.contentId);
        }
    }

    const handleCreateRecipeContent = () => {
        if (selection && selection.contentId) {
            console.log("ContntSearchDialog handleCreateRecipeContent", selection);
            createRecipeContent(selection.contentId);
        }
        setDialogOpen(false);
    }

    // useEffect ///////////////

    useEffect(() => {
        if (!dialogOpen) {
            setSelection(null);
            setSelectedContent(null);
        }
    }, [dialogOpen]);


    // render //////////////////

    return (
        <>
            {
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    maxWidth='xl'
                >
                    <Box
                        width={isMobile ? 350 : 700}
                    >
                        <Box
                            bgcolor={CustomColorScheme['text']}
                            color={CustomColorScheme['white']}
                            paddingY={1}
                            paddingX={2.5}
                        >
                            Select A Recipe Content
                        </Box>

                        <Paper
                            sx={{
                                padding: 2,
                                bgcolor: CustomColorScheme['lightTan'],
                                width: isMobile ? '85%' : 'auto',
                            }}
                        >
                            <Stack spacing={1}>
                                <Autocomplete
                                    disablePortal
                                    options={contentTitles}
                                    getOptionLabel={(option) => option.title}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Title" />}
                                    value={selection}
                                    onChange={handleSelectContent}
                                />
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
                                            "&.MuiTab-root": {
                                                bgcolor: CustomColorScheme['lightTan'],
                                            },
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
                                            "&.MuiTab-root": {
                                                bgcolor: CustomColorScheme['lightTan'],
                                            },
                                            "&.Mui-selected": {
                                                color: CustomColorScheme['black'],
                                                fontWeight: 'bold',
                                            }
                                        }}
                                    />

                                </Tabs>
                                {
                                    selectedContent
                                        ?
                                        <Box
                                            display={tabValue === 0 ? 'block' : 'none'}
                                        >
                                            {selectedContent.ingredients.split('\n').map((ingredient, idx) => {
                                                return (
                                                    <Box
                                                        key={idx}
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'black',
                                                            padding: ingredient.endsWith(":") ? 6.5 : 3,
                                                            paddingLeft: 5,
                                                            fontSize: 16,
                                                            margin: 1,
                                                        }}
                                                    >
                                                        {ingredient.endsWith(":")
                                                            ?
                                                            <Typography
                                                                variant='body1'
                                                                component='div'
                                                                paddingTop={1}
                                                            >
                                                                {ingredient.toUpperCase()}
                                                            </Typography>
                                                            : ingredient}
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                        :
                                        <Box
                                            backgroundColor={CustomColorScheme['white']}
                                            minHeight={200}
                                            display={tabValue === 0 ? 'block' : 'none'}
                                        />
                                }
                                {
                                    selectedContent
                                        ?
                                        <Box
                                            display={tabValue === 1 ? 'block' : 'none'}
                                        >
                                            {
                                                selectedContent.instructions.split('\n').map((instruction, idx) => {
                                                    return (
                                                        <Box
                                                            key={idx}
                                                            style={{
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                padding: instruction.endsWith(":") ? 6.5 : 3,
                                                                paddingLeft: 5,
                                                                fontSize: 16,
                                                                margin: 1,
                                                            }}
                                                        >
                                                            {instruction.endsWith(":")
                                                                ?
                                                                <Typography
                                                                    variant='body1'
                                                                    component='div'
                                                                    paddingTop={1}
                                                                >
                                                                    {instruction.toUpperCase()}
                                                                </Typography>
                                                                : instruction}
                                                        </Box>
                                                    )
                                                })}
                                        </Box>
                                        :
                                        <Box
                                            backgroundColor={CustomColorScheme['white']}
                                            minHeight={200}
                                            display={tabValue === 1 ? 'block' : 'none'}
                                        />

                                }
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
                                        onClick={handleCreateRecipeContent}
                                    >Select
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
export default ContentSearchDialog;
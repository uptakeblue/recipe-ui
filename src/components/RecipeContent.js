// general
import '../App.css';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive'

// material ui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

// icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import { Add } from '@mui/icons-material';
import { Stack, useScrollTrigger } from '@mui/material';
import DeleteConfirmationDialog from './dialogs/DeleteConfirmationDialog';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';


const TabPanel = (props) => {
    const { children, value, index, lastIndex, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

///////////////

export default function RecipeContent(props) {
    const {
        content,
        tabValue,
        setTabValue,
        contentIdx,
        contentLastIdx,
        isAuthenticated,
        handleUpdateRecipeContent,
        setContentDialogOpen,
        setContentSearchDialogOpen,
        setDialogContent,
        deleteRecipeContent,
    } = props;

    // constants /////////////////


    const [deletionConfirmationDialogOpen, setDeletionConfirmationDialogOpen] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })


    // event handlers ////////////

    const handleRecipeContentReorder = (newOrderId) => {
        handleUpdateRecipeContent({
            contentId: content.contentId,
            orderId: newOrderId,
        });
    }

    const handleRecipeContentDelete = () => {
        deleteRecipeContent(content.contentId);
    }

    const handleDialogOpen = () => {
        setDialogContent(content)
        setContentDialogOpen(true)
    }


    // components ////////////////

    const Title = (props) => {
        const { title } = props;
        return (
            <Stack
                direction='row'
                backgroundColor={CustomColorScheme['mediumBrown']}
                sx={{
                    borderBottom: 1,
                    borderColor: CustomColorScheme['tan']
                }}
            >
                <Typography
                    id='id-x-100'
                    variant='h6'
                    component='div'
                    justifyContent='start'
                    display='flex'
                    flexGrow={1}
                    sx={{
                        paddingX: 1,
                        paddingY: .5,
                        marginTop: 1,
                        backgroundColor: CustomColorScheme['mediumBrown'],
                        fontSize: 16,
                        color: CustomColorScheme['white'],
                        fontWeight: 'bold',

                    }}
                >
                    {title}
                </Typography>
                {
                    isAuthenticated &&
                    <>
                        <Tooltip title={contentIdx !== 0 ? 'Move content up' : ''}>
                            <span>
                                <IconButton
                                    disabled={contentIdx === 0}
                                    onClick={() => handleRecipeContentReorder(content.orderId - 1)}
                                >
                                    <KeyboardArrowUpIcon
                                        sx={{
                                            color: contentIdx === 0 ? CustomColorScheme['lightGray'] : CustomColorScheme['darkestBrown'],
                                        }}
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip
                            title={contentIdx !== contentLastIdx ? 'Move content down' : ''}

                        >
                            <span>
                                <IconButton
                                    disabled={contentIdx === contentLastIdx}
                                    onClick={() => handleRecipeContentReorder(content.orderId + 1)}
                                >
                                    <KeyboardArrowDownIcon
                                        sx={{
                                            color: contentIdx === contentLastIdx ? CustomColorScheme['lightGray'] : CustomColorScheme['darkestBrown'],
                                        }}
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title='Disconnect recipe content'>
                            <IconButton
                                onClick={() => setDeletionConfirmationDialogOpen(true)}
                            >
                                <CloseIcon
                                    fontSize='small'
                                    sx={{
                                        color: CustomColorScheme['darkestBrown'],
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit recipe content'>
                            <IconButton
                                onClick={handleDialogOpen}
                            >
                                <EditIcon
                                    fontSize='small'
                                    sx={{
                                        color: CustomColorScheme['darkestBrown'],
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </Stack >
        )
    }


    // renter ////////////////////

    return (
        <>
            <Paper
                id='id-x-1'
                elevation={0}
                // square
                sx={{
                    '&.MuiPaper-root': {
                        bgcolor: CustomColorScheme['tan'],
                    }
                }}
            >
                {
                    contentIdx === 0 && (
                        <Tabs
                            id='id-x-2'
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
                                id='id-x-3'
                                label="Ingredients"
                                index={0}
                            />
                            <Tab
                                id='id-x-4'
                                label="Instructions"
                                index={1}
                            />
                            <Box
                                display='flex'
                                flexGrow={1}
                                justifyContent='end'
                            >
                                {
                                    isAuthenticated &&
                                    <Tooltip title='Add recipe content'>
                                        <IconButton
                                            onClick={() => setContentSearchDialogOpen(true)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </Box>
                        </Tabs>
                    )
                }
                <TabPanel id='id-x-5' value={tabValue} index={0} >
                    {/* INGREDIENTS */}
                    <Title id='id-x-6' title={content.title} />
                    {
                        content.ingredients &&
                        content.ingredients.split('\n').map((ingredient, idx) => {
                            return (
                                <Box
                                    id={'id-x-7-' + idx}
                                    key={idx}
                                    sx={{
                                        bgcolor: CustomColorScheme['brightOrange'],
                                        color: 'black',
                                        paddingX: 1,
                                        paddingY: ingredient.endsWith(":") ? 1.5 : 0.5,
                                        fontSize: 16,
                                        margin: 0,
                                        borderTop: 2,
                                        borderColor: CustomColorScheme['tan']
                                    }}
                                >
                                    {ingredient.endsWith(":")
                                        ?
                                        <Typography
                                            variant='body1'
                                            component='div'
                                            color={CustomColorScheme['amber']}
                                            paddingTop={1}
                                        >
                                            {ingredient.toUpperCase()}
                                        </Typography>
                                        : ingredient}
                                </Box>
                            )
                        })
                    }
                </TabPanel>
                <TabPanel id='id-x-8' value={tabValue} index={1}>
                    {/* INSTRUCTIONS */}
                    <Title id='id-x-9' title={content.title} />
                    {
                        content.instructions &&
                        content.instructions.split('\n').map((instruction, idx) => {
                            return (
                                <Box
                                    id={'id-x-10-' + idx}
                                    key={idx}
                                    sx={{
                                        bgcolor: CustomColorScheme['darkGreen'],
                                        color: CustomColorScheme['white'],
                                        paddingX: 1,
                                        paddingY: instruction.endsWith(":") ? 1.5 : 0.5,
                                        fontSize: 16,
                                        margin: 0,
                                        borderTop: 2,
                                        borderColor: CustomColorScheme['tan']
                                    }}
                                >
                                    {instruction.endsWith(":")
                                        ?
                                        <Typography
                                            variant='body1'
                                            component='div'
                                            color={CustomColorScheme['amber']}
                                            paddingTop={1}
                                        >
                                            {instruction.toUpperCase()}
                                        </Typography>
                                        : instruction}
                                </Box>
                            )
                        })}
                </TabPanel>
                <DeleteConfirmationDialog
                    message={`Remove "${content.title}" from this recipe?`}
                    open={deletionConfirmationDialogOpen}
                    setOpen={setDeletionConfirmationDialogOpen}
                    onDelete={handleRecipeContentDelete}
                />
            </Paper>
        </>
    )

}
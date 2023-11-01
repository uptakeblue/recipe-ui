// general
import '../App.css';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// components
import { CustomColorScheme } from '../components/CustomTheme';
import { Add } from '@mui/icons-material';
import { Stack } from '@mui/material';


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
        contentsDialogOpen,
        setContentsDialogOpen,
        dialogContent,
        setDialogContent,
    } = props;

    // constants /////////////////

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })


    // event handlers ////////////

    const handleRecipeContentReorder = (newOrderId) => {
        handleUpdateRecipeContent({
            contentId: content.contentId,
            orderId: newOrderId,
        });
    }

    const handleContentUpdate = (contentObj) => {

    }

    const handleDialogOpen = () => {
        setDialogContent(content)
        setContentsDialogOpen(true)
    }


    // components ////////////////

    const Title = (props) => {
        const { title } = props;
        return (
            <Stack
                direction='row'
                backgroundColor={CustomColorScheme['mediumBrown']}
                sx={{
                    borderBottom: 2,
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
                        padding: .5,
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
                        <Tooltip title='Move content up'>
                            <IconButton
                                disabled={contentIdx === 0}
                                onClick={() => handleRecipeContentReorder(content.orderId - 1)}
                            >
                                <KeyboardArrowUpIcon
                                    sx={{
                                        color: contentIdx === 0 ? '#a0a0a0' : CustomColorScheme['darkestBrown'],
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Move content down'>
                            <IconButton
                                disabled={contentIdx === contentLastIdx}
                                onClick={() => handleRecipeContentReorder(content.orderId + 1)}
                            >
                                <KeyboardArrowDownIcon
                                    sx={{
                                        color: contentIdx === contentLastIdx ? '#a0a0a0' : CustomColorScheme['darkestBrown'],
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
            </Stack>
        )
    }


    // renter ////////////////////

    return (
        <>
            <Paper
                id='id-x-1'
                elevation={0}
                square
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
                            textColor='inherit'
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
                                        <IconButton>
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
                        content.ingredients.split('\n').map((ingredient, idx) => {
                            return (
                                <Box
                                    id={'id-x-7-' + idx}
                                    key={idx}
                                    sx={{
                                        bgcolor: CustomColorScheme['brightorange'],
                                        color: 'black',
                                        padding: 0.5,
                                        fontSize: 16,
                                        margin: 0,
                                        borderBottom: ingredient.endsWith(":") ? 0 : 2,
                                        borderColor: CustomColorScheme['tan']
                                    }}
                                >
                                    {ingredient}
                                </Box>
                            )
                        })
                    }
                </TabPanel>
                <TabPanel id='id-x-8' value={tabValue} index={1}>
                    {/* INSTRUCTIONS */}
                    <Title id='id-x-9' title={content.title} />
                    {
                        content.instructions.split('\n').map((instruction, idx) => {
                            return (
                                <Box
                                    id={'id-x-10-' + idx}
                                    key={idx}
                                    sx={{
                                        bgcolor: CustomColorScheme['darkGreen'],
                                        color: CustomColorScheme['white'],
                                        padding: 0.5,
                                        fontSize: 16,
                                        margin: 0,
                                        borderBottom: instruction.endsWith(":") ? 0 : 2,
                                        borderColor: CustomColorScheme['tan']
                                    }}
                                >
                                    {instruction.endsWith(":") ? instruction : instruction}
                                </Box>
                            )
                        })}
                </TabPanel>
            </Paper>
        </>
    )

}
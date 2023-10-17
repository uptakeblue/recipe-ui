// general
import '../App.css';
import { useMediaQuery } from 'react-responsive'

// material ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

// components
import { CustomColorScheme } from '../components/CustomTheme';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

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
        contentIdx
    } = props;
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const Title = (props) => {
        const { title } = props;
        return (
            <Typography
                id='id-x-100'
                variant='h6'
                component='div'
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
        )
    }

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
                                        borderTop: 2,
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
                                        borderTop: 2,
                                        borderColor: CustomColorScheme['tan']
                                    }}
                                >
                                    {instruction}
                                </Box>
                            )
                        })}
                </TabPanel>
            </Paper>
        </>
    )

}
// general
import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from "html-to-react";

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

// components
import { CustomColorScheme } from '../components/CustomTheme';



function TabPanel(props) {
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

///////////////

export default function RecipeContent(props) {
    const { content, tabValue, setTabValue, contentIdx } = props;

    const Title = (props, ...other) => {
        const { title } = props;
        return (
            <Typography
                variant='h6'
                component='div'
                {...other}
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
                elevation={0}
                square
                sx={{
                    '&.MuiPaper-root': {
                        bgcolor: CustomColorScheme['weekend'],
                    }
                }}
            >
                {
                    contentIdx === 0 && (
                        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="basic tabs example">
                            <Tab label="Ingredients" index={0} />
                            <Tab label="Instructions" index={1} />
                        </Tabs>
                    )
                }
                <TabPanel value={tabValue} index={0} >
                    {/* INGREDIENTS */}
                    <Title title={content.title} />
                    {
                        content.ingredients.split('\n').map((ingredient, idx) => {
                            return (
                                <Box
                                    key={idx}
                                    sx={{
                                        bgcolor: CustomColorScheme['brightorange'],
                                        color: 'black',
                                        padding: 0.5,
                                        fontSize: 16,
                                        margin: 0,
                                        borderTop: 2,
                                        borderColor: CustomColorScheme['weekend']
                                    }}
                                >
                                    {ingredient}
                                </Box>
                            )
                        })
                    }
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    {/* INSTRUCTIONS */}
                    <Title title={content.title} />
                    {content.instructions.split('\n').map((instruction, idx) => {
                        return (
                            <Box
                                key={idx}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'black',
                                    padding: 0.5,
                                    fontSize: 16,
                                    margin: 0,
                                    borderTop: 2,
                                    borderColor: CustomColorScheme['weekend']
                                }}
                            >
                                {instruction}
                            </Box>
                        )
                    })}
                </TabPanel>
            </Paper >
        </>
    )

}
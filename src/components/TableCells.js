// general
import '../App.css';
import React, { useState } from 'react';
import dayjs from 'dayjs';


// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

// components
import { CustomColorScheme } from '../components/CustomTheme';


const StyledLinkButton = styled(Typography)(({ theme }) => ({
    color: CustomColorScheme['text'],
    '&.MuiTypography-root,  &.MuiTypography-root:hover': {
        cursor: 'pointer',
        fontSize: 13,
        variant: 'body1',
        component: 'div',
        lineHeight: 'normal',
        gutterBottom: 1,
    },
    '&.MuiTypography-root:hover': {
        textDecoration: 'underline',
    },
}));


export const TableCellHead = (props) => {
    const { val, index, ...children } = props;
    return (
        <Box
            {...children}
            textAlign='center'
            width='14.28%'
            border={1}
            paddingY={0.25}
            borderColor={CustomColorScheme['body']}
            backgroundColor={CustomColorScheme['tablehead']}
            color='white'
        >
            {val}
        </Box>
    );
};

export const TableCellBody = (props) => {
    const {
        dayObject,
        index,
        handleDateitemDialogOpenNew,
        handleDateitemDialogOpen,
        searchDate,
        ...children
    } = props;

    const dateStr = dayjs(dayObject.date).format('YYYY-MM-DD');
    const isToday = dateStr === dayjs().format('YYYY-MM-DD');

    return (
        <Box
            {...children}
            textAlign='start'
            width='14.28%'
            height={105}
            border={isToday || dateStr === searchDate ? 2 : 1}
            padding={
                isToday || dateStr === searchDate
                    ? 0.6
                    : 0.75}
            borderColor={
                dateStr === searchDate
                    ? "blue"
                    : (isToday ? 'red' : CustomColorScheme['body'])
            }
            backgroundColor={CustomColorScheme[dayObject.cellcolor]}
            color={CustomColorScheme['text']}
        >
            <Stack spacing={0}>
                <StyledLinkButton
                    fontSize={12}
                    variant='body1'
                    component='div'
                    onClick={() => handleDateitemDialogOpenNew(dateStr)}
                >
                    {dayjs(dayObject.date).format('MMM D')}
                </StyledLinkButton>
                <Box marginBottom={0.75}>
                    {dayObject.events.map((event, idx) => {
                        return (
                            <Typography
                                key={100 + idx}
                                fontSize={12}
                                fontStyle='italic'
                                variant='body1'
                                component='div'
                                lineHeight='normal'
                            >
                                {event.title}
                            </Typography>
                        );
                    })}
                </Box>
                {dayObject.dateitems.map((dateitem, idx) => {
                    return (
                        <>
                            <Stack
                                direction='row'
                                key={idx}
                            >
                                <Tooltip
                                    key={'tooltip-' + idx}
                                    title={
                                        <span style={{ whiteSpace: 'pre-line' }}>
                                            {dateitem.detail}
                                        </span>
                                    }
                                    disableHoverListener={!dateitem.detail}
                                    arrow
                                >
                                    <>
                                        <StyledLinkButton
                                            key={'styledlinkbutton-' + idx}
                                            fontWeight='bold'
                                            fontStyle={dateitem.isHighlighted ? 'italic' : 'normal'}
                                            onClick={() =>
                                                handleDateitemDialogOpen(dateitem.dateitemId)
                                            }
                                        >
                                            {dateitem.title}
                                        </StyledLinkButton>
                                        <Box
                                            kry={'box-' + idx}
                                            display='flex'
                                            flexGrow={1}
                                        />
                                    </>
                                </Tooltip>
                            </Stack>
                            <Typography
                                key={'typography-' + idx}
                                fontSize={12}
                                fontWeight='normal'
                                variant='body1'
                                component='div'
                                lineHeight='normal'
                                fontStyle={dateitem.isHighlighted ? 'italic' : 'normal'}
                                gutterBottom
                            >
                                {dateitem.description}
                            </Typography>
                        </>
                    );
                })}
            </Stack>
        </Box>
    );
};

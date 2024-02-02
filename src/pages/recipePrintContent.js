// general
import '../App.css';
import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Parser } from "html-to-react";
import { useReactToPrint } from 'react-to-print';

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import { CustomColorScheme } from '../components/CustomTheme';


const ParsedText = (props) => {
  const { rawText } = props;
  const htmlParser = new Parser();

  return rawText && (
    <span>
      {
        rawText.split('\n').map((sentence, idx) => {
          let innerHtml = htmlParser.parse(sentence);
          return (
            <span key={idx}>{innerHtml}</span>
          )
        })
      }
    </span>
  )
}

////////////////////////


export default function RecipePrintContent(props) {
  const {
    recipeMap,
    componentRef,
  } = props;


  // constants //////////////

  const navigate = useNavigate();

  const imagefile = recipeMap && (
    recipeMap.imageFile
    && (
      `${process.env.REACT_APP_IMAGE_BASE_URL + "/" + recipeMap.imageFile}`
    )
  )

  // event handlers /////////

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Recipe',
    onAfterPrint: () => console.log('Printed PDF successfully!'),
  });

  const bullet = '\x149'

  // render //////////////////

  return recipeMap && (
    <Paper
      ref={componentRef}
      elevation={0}
      sx={{
        padding: 4,
        margin: 1,
      }}
    >
      <Stack
        direction='column'
        width="100%"
        spacing={2}
      >
        <Typography
          display='flex'
          variant='h5'
          component='div'
          textAlign='center'
        >
          {recipeMap.title}
        </Typography>
        <Box>
          <ParsedText
            rawText={recipeMap.description}
          />
        </Box>
        {recipeMap.note && (
          <>
            <div style={{ fontWeight: 'bold', }}>
              Note:
            </div>
            <ParsedText
              rawText={recipeMap.note}
            />
          </>
        )}
        {recipeMap.imageFile &&
          (
            <img
              src={imagefile}
              width='33%'
              height='auto'
            />
          )
        }

        <Stack
          spacing={3}
        >
          {
            recipeMap.content &&
            recipeMap.content.map((content, cidx) => {
              return (
                <div key={cidx}>
                  <Box
                    sx={{
                      fontWeight: 'bold',
                      margin: 0,
                    }}
                  >
                    <Typography
                      component='div'
                      variant='h6'
                      sx={{
                        marginBottom: 1,
                      }}
                    >
                      {content.title}
                    </Typography>
                    Ingredients:</Box>
                  {/* <Box
                    sx={{
                      paddingLeft: 2,
                      margin: 0,
                    }}
                  > */}
                  {
                    content.ingredients &&
                    content.ingredients.split('\n').map((ingredient, idx) => {
                      return (
                        ingredient && (
                          <Typography
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              paddingY: 0.5,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                width: 10,
                                paddingRight: 1,
                                color: CustomColorScheme['gray']
                              }}
                            />
                            {ingredient}
                          </Typography>
                        ))
                    })}
                  {/* </Box> */}
                  <Box
                    sx={{
                      fontWeight: 'bold',
                      margin: 0,
                      marginTop: 2,
                      paddingBottom: 1,
                      borderBottom: 1,
                    }}>
                    Instructions:
                  </Box>
                  {
                    content.instructions &&
                    content.instructions.split('\n').map((instruction, idx) => {
                      return instruction && (
                        <Typography
                          key={idx}
                          sx={{
                            paddingY: 0.5,
                            borderBottom: 1,
                          }}
                        >
                          {instruction}
                        </Typography>
                      )
                    })}
                </div>
              )
            })
          }
        </Stack>

      </Stack>

    </Paper>
  )
}
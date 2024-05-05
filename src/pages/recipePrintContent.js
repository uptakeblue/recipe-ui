// general
import '../App.css';
import { Parser } from "html-to-react";

// material ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// icons
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ParsedText = (props) => {
  const {
    rawText,
  } = props;

  const htmlParser = new Parser();

  return rawText && (
    <span
      style={{
        fontSize: 14,
      }}
    >
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


/////////////////////////////


export default function RecipePrintContent(props) {
  const {
    recipeMap,
    componentRef,
  } = props;


  // constants //////////////

  const textsize = 13;

  const imagefile = recipeMap && (
    recipeMap.imageFile
    && (
      `${process.env.REACT_APP_IMAGE_BASE_URL + "/" + recipeMap.imageFile}`
    )
  )

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
        <Typography>
          Michael's Recipes
        </Typography>
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
            <div
              style={{
                fontWeight: 'bold',
              }}>
              Note:
            </div>
            <ParsedText
              rawText={recipeMap.note}
            />
          </>
        )}
        {
          recipeMap.imageFile &&
          <img
            src={imagefile}
            width='33%'
            height='auto'
          />

        }

        {
          recipeMap.content &&
          recipeMap.content.map((content, cidx) => {
            return (
              <div
                key={cidx}
                border={1}
              >
                <Typography
                  component='div'
                  variant='h6'
                  fontWeight='bold'
                >
                  {content.title}
                </Typography>
                <Box
                  sx={{
                    fontWeight: 'bold',
                    margin: 0,
                    marginTop: 2,
                    marginBottom: 1,
                  }}>
                  INGREDIENTS:
                </Box>

                {
                  content.ingredients &&
                  content.ingredients.split('\n').map((ingredient, idx) => {
                    return (
                      ingredient &&
                      <div
                        key={idx}
                        style={{
                          fontSize: textsize,
                        }}
                      >
                        {
                          ingredient.endsWith(":")
                            ?
                            <Box
                              marginTop={1}
                              marginBottom={.5}
                            >
                              {ingredient.toUpperCase()}
                            </Box>
                            :
                            <Stack
                              display='flex'
                              direction='row'
                              alignItems='center'
                            >
                              <CircleIcon
                                sx={{
                                  height: 6,
                                }}
                              />
                              {ingredient}
                            </Stack>
                        }
                      </div>
                    )
                  })}

                <Box
                  sx={{
                    fontWeight: 'bold',
                    margin: 0,
                    marginTop: 2,
                    marginBottom: 1,
                  }}>
                  INSTRUCTIONS:
                </Box>

                {
                  content.instructions &&
                  content.instructions.split('\n').map((instruction, idx) => {
                    return instruction &&
                      <div
                        key={idx}
                        style={{
                          fontSize: textsize,
                        }}
                      >
                        {
                          instruction.endsWith(":")
                            ?
                            <Box
                              marginTop={1}
                              marginBottom={.5}
                            >
                              {instruction.toUpperCase()}
                            </Box>
                            :
                            <Stack
                              display='flex'
                              direction='row'
                              alignItems='start'
                            >
                              <RadioButtonUncheckedIcon
                                sx={{
                                  height: 6,
                                  marginTop: .5,
                                }}
                              />
                              {instruction}
                            </Stack>
                        }
                      </div>


                  })}

              </div>
            )
          })
        }

      </Stack>

    </Paper>
  )
}
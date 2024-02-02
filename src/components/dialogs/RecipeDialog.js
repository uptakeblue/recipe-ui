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
import Dialog from '@mui/material/Dialog';
import { IconButton, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

// icons
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

// custom components
import { CustomColorScheme } from '../CustomTheme';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'

////////////////////////////////


const RecipeDialog = (props) => {
  const {
    dialogOpen,
    setDialogOpen,
    recipe,
    updateRecipe,
    deleteRecipe,
  } = props;

  // constants////////////////

  const [title, setTitle] = useState('');
  const [photoCredit, setPhotoCredit] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [recipeId, setRecipeId] = useState();
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [previewFile, setPreviewFile] = useState('');
  const [previewFileUri, setPreviewFileUri] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const [originalRoute, setOriginalRoute] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);

  const [isTitleError, setIsTitleError] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 750px)' })


  // event handlers //////////

  const handleTitleChange = (event) => {
    let t = event.currentTarget.value;
    setTitle(t);
    setIsTitleError(!t);
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
    setImageFile(null)
  }

  const handleRecipeSave = () => {
    let route = (title === originalTitle)
      ? originalRoute
      : title.replace(/[\W_]+/g, "-").replace(/^-+/, '').replace(/-+$/, '').toLowerCase();

    let formData = new FormData();
    if (previewFile !== null) {
      formData.append('imageFile', previewFile);
      formData.append('photoCredit', photoCredit ? photoCredit : '');
    } else if (imageFile !== null) {
      formData.append('imageFile', imageFile);
      formData.append('photoCredit', photoCredit ? photoCredit : '');
    } else {
      formData.append('retainImageFile', false);
    }
    formData.append('recipeId', recipeId);
    formData.append('title', title);
    formData.append('description', description ? description : '');
    formData.append('note', note ? note : '');
    formData.append('route', route);
    formData.append('isfavorite', isFavorite);
    updateRecipe(formData);
    setDialogOpen(false);
  }

  // useEffect ///////////////

  useEffect(() => {
    if (!dialogOpen) {
      setTitle('');
      setOriginalTitle('');
      setDescription('');
      setNote('');
      setImageFile('');
      setPhotoCredit('')
      setOriginalRoute('');
      setIsFavorite(false);
      setRecipeId(null);
      setPreviewFileUri(null);
      setPreviewFile(null);
      setPreviewFileName(null)
    } else {
      setTitle(recipe.title);
      setOriginalTitle(recipe.title);
      setDescription(recipe.description);
      setNote(recipe.note);
      setImageFile(recipe.imageFile);
      setPhotoCredit(recipe.photoCredit)
      setOriginalRoute(recipe.route);
      setIsFavorite(recipe.isFavorite);
      setRecipeId(recipe.recipeId);
      setPreviewFileName(recipe.imageFile && recipe.imageFile !== 'None' ? recipe.imageFile : '')
      setPreviewFileUri(recipe.imageFile && recipe.imageFile !== 'None' ? `${process.env.REACT_APP_IMAGE_BASE_URL + "/" + recipe.imageFile}` : '');
    }
    setIsTitleError(false);
  }, [dialogOpen]);


  // render //////////////////

  return (
    <>
      {
        recipe &&
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          sx={{
            marginX: -3,
          }}
        // maxWidth='xl'
        >
          <Box
            width={isMobile ? 385 : 600}
          >
            <Box
              bgcolor={CustomColorScheme['text']}
              color={CustomColorScheme['white']}
              paddingY={1}
              paddingX={2.5}
            >
              Edit Recipe
            </Box>

            <Paper
              sx={{
                padding: 2,
                bgcolor: CustomColorScheme['lightTan'],
                width: isMobile ? '90%' : 'auto',
              }}
            >
              <Stack spacing={1}>
                <Stack direction='row'>
                  <FormControl
                    error={isTitleError}
                    sx={{
                      width: '100%',
                      marginRight: 1,
                    }}
                  >
                    <TextField
                      value={title ? title : ''}
                      onChange={handleTitleChange}
                      label="Title"
                      variant='standard'
                      error={isTitleError}
                      padding={1}
                      width='100%'
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
                          fontSize: 18,
                        }
                      }}
                    />
                    {
                      isTitleError &&
                      <FormHelperText>Title is required</FormHelperText>
                    }
                  </FormControl>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Tooltip title='Delete thi recipe'>
                      <IconButton
                        onClick={() => setDeleteConfirmationDialogOpen(true)}

                        sx={{
                          ':hover': {
                            color: CustomColorScheme['red'],
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                    <IconButton
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      {
                        isFavorite
                          ? <FavoriteIcon
                            sx={{
                              color: CustomColorScheme['darkRed'],
                            }}
                          />
                          : <FavoriteBorderIcon />
                      }
                    </IconButton>
                  </Box>
                </Stack>
                <Stack direction='row' spacing={1}>
                  {
                    previewFileUri
                      ?
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
                      :
                      <Box height={300}></Box>
                  }
                  <Box
                    display='flex'
                    flexGrow={1}
                    justifyContent='end'
                    alignItems='center'
                  >
                    <Stack>
                      <Tooltip title='Browse for an image file' >
                        <label htmlFor='image-select'>
                          <IconButton
                            component="label"
                          >
                            <ImageSearchIcon />
                            <input
                              style={{
                                display: "none"
                              }}
                              type="file"
                              onChange={handleFilePreview}
                              name="file"
                            />
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
                {
                  previewFileUri &&
                  <TextField
                    value={photoCredit ? photoCredit : ''}
                    onChange={(e) => setPhotoCredit(e.target.value)}
                    label="Photo Credit"
                    variant='standard'
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
                        fontSize: 18,
                      }
                    }}
                  />
                }
                <TextField
                  value={description ? description : ''}
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
                  value={note ? note : ''}
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
                  onClick={handleRecipeSave}
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
          <DeleteConfirmationDialog
            message={`Delete recipe "${recipe.title}"?`}
            open={deleteConfirmationDialogOpen}
            setOpen={setDeleteConfirmationDialogOpen}
            onDelete={() => deleteRecipe(recipe.recipeId)}
          />
        </Dialog >
      }

    </>
  )
}

export default RecipeDialog;
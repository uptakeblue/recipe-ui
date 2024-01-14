// general
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// components
import Index from './pages/index';
import * as auth from "./auth"
import {
  RecipeContext,
  HomeContext,
  AppbarContext,
} from './components/AllContext'


///////////////////////

export default function App() {

  // constants ////////////

  const [recipeSearchResults, setRecipeSearchResults] = useState();
  const [contentTitles, setContentTitles] = useState();
  const [recipeMap, setRecipeMap] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [localKeyword, setLocalKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const keyword = localStorage.getItem("keyword") !== null
    ? JSON.parse(localStorage.getItem("keyword"))
    : ""


  // context //////////////

  const appbarContext = {
    createRecipe: createRecipe,
  };

  const homeContext = {
    recipeSearchResults: recipeSearchResults,
    getRecipeSearchResults: getRecipeSearchResults,
    localKeyword: localKeyword,
    setLocalKeyword: setLocalKeyword,
    page: page,
    setPage: setPage,
    statusMessage: statusMessage,
    setStatusMessage: setStatusMessage,
    loading: loading,
  };

  const recipeContext = {
    recipeMap: recipeMap,
    getRecipeByRoute: getRecipeByRoute,
    updateRecipeContent: updateRecipeContent,
    updateContent: updateContent,
    updateRecipe: updateRecipe,
    contentTitles: contentTitles,
    getSelectedContent: getSelectedContent,
    selectedContent: selectedContent,
    setSelectedContent: setSelectedContent,
    createRecipeContent: createRecipeContent,
    deleteRecipeContent: deleteRecipeContent,
    statusMessage: statusMessage,
    setStatusMessage: setStatusMessage,
    deleteRecipe: deleteRecipe,
  };


  // API //////////////////

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // retrieve a specific content record
  async function getSelectedContent(contentId) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/content/${contentId}`
    await axios
      .get(url)
      .then((response) => {
        setSelectedContent(response.data);
      })
      .catch((error) => {
        console.log('API getContent error: ', contentId);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // delete a recipe
  async function deleteRecipe(recipeId) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/${recipeId}`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    await axios
      .delete(
        url,
        headers,
      )
      .then((response) => {
        let keyword = localStorage.getItem("keyword") !== null
          ? JSON.parse(localStorage.getItem("keyword"))
          : ""
        getRecipeSearchResults(keyword);
        navigate("/");
      })
      .catch((error) => {
        console.log('API deleteRecipe error: ', recipeId);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // create a recipe, including image, ingredients and instructions 
  async function createRecipe(formData) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    let data = {};
    formData.forEach((value, key) => data[key] = value);

    await axios
      .post(
        url,
        formData,
        headers,
      ).then((response) => {
        navigate(`/recipe/${data['route']}`);
      })
      .catch((error) => {
        let errMessage = "Recipe was not created"
        if (error.response && error.response.data && error.response.data.description) {
          errMessage += '. ' + error.response.data.description;
        }
        setStatusMessage({
          status: "error",
          message: errMessage,
        })
        console.log('API createRecipe error: ', data);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // update a recipe, including it's image
  async function updateRecipe(formData) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    let data = {};
    formData.forEach((value, key) => data[key] = value);

    await axios
      .put(
        url,
        formData,
        headers,
      ).then((response) => {
        getRecipe(data['recipeId']);
        setStatusMessage({
          status: "success",
          message: "Recipe was updated",
          route: data['route'],
        })
        getRecipeSearchResults(keyword)
      })
      .catch((error) => {
        setStatusMessage({
          status: "error",
          message: "Recipe was not updated",
        })
        console.log('API updateRecipe error: ', data);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // changes the orderId value of a recipeContent reltionship
  async function updateContent(contentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/content`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    await axios
      .put(
        url,
        contentsObj,
        headers,
      )
      .then((response) => {
        getRecipeByRoute(contentsObj.route)
      })
      .catch((error) => {
        console.log('API updateContent error: ', contentsObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // creates a new recipeContent relationship
  async function createRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    await axios
      .post(
        url,
        recipecontentsObj,
        headers,
      )
      .then((response) => {
        getRecipeByRoute(recipecontentsObj.route)
      })
      .catch((error) => {
        console.log('API createRecipeContent error: ', recipecontentsObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // deletes a recipeContent relationship
  async function deleteRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/${recipecontentsObj.recipeId}/${recipecontentsObj.contentId}`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    await axios
      .delete(
        url,
        headers,
      )
      .then((response) => {
        getRecipeByRoute(recipecontentsObj.route)
      })
      .catch((error) => {
        console.log('API deleteRecipeContent error: ', recipecontentsObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // PROTECTED
  // changes the orderId value of a recipeContent relationship
  async function updateRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent`

    const session = await auth.getSession();
    const accessToken = session.accessToken.jwtToken

    let headers = {
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    }

    await axios
      .put(
        url,
        recipecontentsObj,
        headers,
      )
      .then((response) => {
        getRecipeByRoute(recipecontentsObj.route)
      })
      .catch((error) => {
        console.log('API updateRecipeContent error: ', recipecontentsObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // retrieves a list recipes from a keyword search
  async function getRecipeSearchResults(searchParam) {
    let url = searchParam
      ? `${process.env.REACT_APP_API_BASE_URL}/recipe/map/search/${searchParam}`
      : `${process.env.REACT_APP_API_BASE_URL}/recipe/map/`;
    setLoading(true);
    await axios
      .get(url)
      .then((response) => {
        setRecipeSearchResults(response.data.recipes);
        setContentTitles(response.data.contentTitles);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('API getRecipeSearchResults error: ', searchParam);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // retrieves a specific recipe record by id, including contents
  async function getRecipe(recipeId) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/${recipeId}`
    await axios
      .get(url)
      .then((response) => {
        setRecipeMap(response.data);
        getRecipeSearchResults(keyword);
      })
      .catch((error) => {
        console.log('API getRecipe error: ', recipeId);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // retrieves a specific recipe record by route, including contents
  async function getRecipeByRoute(route) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/route/${route}`
    await axios
      .get(url)
      .then((response) => {
        setRecipeMap(response.data);
        getRecipeSearchResults(keyword);
      })
      .catch((error) => {
        console.log('API getRecipeByRoute error: ', route);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  function processError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code > 200
      console.log('API error.response.data: ', error.response.data);
      console.log('API error.response.status: ', error.response.status);
      console.log('API error.response.headers: ', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('API error.request: ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('API error.message: ', error.message);
    }
    console.log('API error.config', error.config);
  }

  return (
    <AppbarContext.Provider value={appbarContext} >
      <HomeContext.Provider value={homeContext} >
        <RecipeContext.Provider value={recipeContext}>
          <Index />
        </RecipeContext.Provider>
      </HomeContext.Provider>
    </AppbarContext.Provider>
  );
}

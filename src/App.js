// general
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CookiesProvider, useCookies } from "react-cookie";
import {
  RecipeContext,
  HomeContext,
  AppbarContext,
} from './components/AllContext'

// material
import dayjs from 'dayjs';

// components
import Index from './pages/index';

///////////////////////

export default function App() {

  // constants ////////////

  const [recipeSearchResults, setRecipeSearchResults] = useState();
  const [contentTitles, setContentTitles] = useState();
  const [recipeMap, setRecipeMap] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [localKeyword, setLocalKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [transmittedKeyword, setTransmittedKeyword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [cookie, setCookie] = useCookies(["keyword"]);

  // context //////////////

  const appbarContext = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  const homeContext = {
    recipeSearchResults: recipeSearchResults,
    getRecipeSearchResults: getRecipeSearchResults,
    localKeyword: localKeyword,
    setLocalKeyword: setLocalKeyword,
    page: page,
    setPage: setPage,
    transmittedKeyword: transmittedKeyword,
    setTransmittedKeyword: setTransmittedKeyword,
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  const recipeContext = {
    recipeMap: recipeMap,
    getRecipeByRoute: getRecipeByRoute,
    isAuthenticated: isAuthenticated,
    updateRecipeContent: updateRecipeContent,
    updateContent: updateContent,
    updateRecipe: updateRecipe,
    contentTitles: contentTitles,
    getSelectedContent: getSelectedContent,
    selectedContent: selectedContent,
    setSelectedContent: setSelectedContent,
    createRecipeContent: createRecipeContent,
    deleteRecipeContent: deleteRecipeContent,
  };

  // useEffect ////////////

  useEffect(() => {
    getRecipeSearchResults(cookie.keyword);
    setTransmittedKeyword(cookie.keyword)
  }, []);

  // API //////////////////

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  async function getSelectedContent(contentId) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/content/${contentId}/`
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


  // update a recipe, including it's image 
  async function updateRecipe(formData) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/`

    let data = {};
    formData.forEach((value, key) => data[key] = value);

    await axios
      .put(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      ).then((response) => {
        getRecipeByRoute(data['route']);
      })
      .catch((error) => {
        console.log('API updateRecipe error: ', data);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  // changes the orderId value of a recipeContent reltionship
  async function updateContent(contentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/content/`
    await axios
      .put(
        url,
        contentsObj,
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


  // creates a new recipeContent relationship
  async function createRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/`
    await axios
      .post(
        url,
        recipecontentsObj,
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


  // deletes a recipeContent relationship
  async function deleteRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/${recipecontentsObj.recipeId}/${recipecontentsObj.contentId}/`
    await axios
      .delete(url)
      .then((response) => {
        getRecipeByRoute(recipecontentsObj.route)
      })
      .catch((error) => {
        console.log('API deleteRecipeContent error: ', recipecontentsObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // changes the orderId value of a recipeContent relationship
  async function updateRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/`
    await axios
      .put(
        url,
        recipecontentsObj,
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

  async function getRecipeSearchResults(keyword) {
    setCookie("keyword", keyword, { path: "/" })
    let url = keyword
      ? `${process.env.REACT_APP_API_BASE_URL}/recipe/search/${keyword}/`
      : `${process.env.REACT_APP_API_BASE_URL}/recipe/map/`;
    await axios
      .get(url)
      .then((response) => {
        setRecipeSearchResults(response.data.recipes);
        setContentTitles(response.data.contentTitles);
      })
      .catch((error) => {
        console.log('API getRecipeSearchResults error: ', keyword);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function getRecipeByRoute(route) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/route/${route}/`
    await axios
      .get(url)
      .then((response) => {
        setRecipeMap(response.data);
        getRecipeSearchResults(cookie.keyword);
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

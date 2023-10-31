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
  const [recipeMap, setRecipeMap] = useState();
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
    setIsAuthenticated: setIsAuthenticated,
    updateRecipeContents: updateRecipeContents,
  };

  // useEffect ////////////

  useEffect(() => {
    getRecipeSearchResults(cookie.keyword);
    setTransmittedKeyword(cookie.keyword)
  }, []);

  // API //////////////////

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // changes the orderId value of a reciepContent reltionship
  async function updateRecipeContents(recipecontentObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/`
    await axios
      .put(
        url,
        recipecontentObj,
      )
      .then((response) => {
        getRecipeByRoute(recipecontentObj.routeUrl)
      })
      .catch((error) => {
        console.log('API updateRecipeContents error: ', recipecontentObj);
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
        setRecipeSearchResults(response.data);
      })
      .catch((error) => {
        console.log('API getRecipeSearchResults error: ', keyword);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function getRecipeByRoute(routeUrl) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/route/${routeUrl}/`
    await axios
      .get(url)
      .then((response) => {
        setRecipeMap(response.data);
      })
      .catch((error) => {
        console.log('API getRecipeByRoute error: ', routeUrl);
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

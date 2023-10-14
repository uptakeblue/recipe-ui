// general
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material
import dayjs from 'dayjs';

// components
import Index from './pages';

///////////////////////

export default function App() {
  // constants ////////////

  const [recipeSearchResults, setRecipeSearchResults] = useState();
  const [recipeMap, setRecipeMap] = useState();

  // useEffect ////////////

  useEffect(() => {
    getRecipeSearchResults();
  }, []);

  // API //////////////////

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  async function getRecipeSearchResults(keyword) {
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
    <Index
      recipeSearchResults={recipeSearchResults}
      getRecipeSearchResults={getRecipeSearchResults}
      recipeMap={recipeMap}
      getRecipeByRoute={getRecipeByRoute}
    />
  );
}

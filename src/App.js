// general
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

// material
import dayjs from 'dayjs';

// components
import Index from './pages/index';
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
  const auth0 = useAuth0();

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

  // delete a recipe
  async function deleteRecipe(recipeId) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/${recipeId}/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Authorization": `Bearer ${token}`,
      }
    }
    await axios
      .delete(
        url,
        headers,
      )
      .then((response) => {
        let keyword = Cookies.get("keyword");
        getRecipeSearchResults(keyword);
        navigate("/");
      })
      .catch((error) => {
        console.log('API deleteRecipe error: ', recipeId);
        console.log('API error url: ', url);
        processError(error);
      });
  }


  // create a recipe, including image, ingredients and instructions
  async function createRecipe(formData) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
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


  // update a recipe, including it's image 
  async function updateRecipe(formData) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
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
        let keyword = Cookies.get("keyword");
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

  // changes the orderId value of a recipeContent reltionship
  async function updateContent(contentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/content/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Authorization": `Bearer ${token}`,
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


  // creates a new recipeContent relationship
  async function createRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Authorization": `Bearer ${token}`,
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


  // deletes a recipeContent relationship
  async function deleteRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/${recipecontentsObj.recipeId}/${recipecontentsObj.contentId}/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Authorization": `Bearer ${token}`,
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


  // changes the orderId value of a recipeContent relationship
  async function updateRecipeContent(recipecontentsObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipecontent/`
    const token = await auth0.getAccessTokenSilently();
    let headers = {
      "headers": {
        "Authorization": `Bearer ${token}`,
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

  async function getRecipeSearchResults(keyword) {
    let url = keyword
      ? `${process.env.REACT_APP_API_BASE_URL}/recipe/search/${keyword}/`
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
        console.log('API getRecipeSearchResults error: ', keyword);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function getRecipe(recipeId) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/${recipeId}/`
    await axios
      .get(url)
      .then((response) => {
        setRecipeMap(response.data);
        let keyword = Cookies.get("keyword");
        getRecipeSearchResults(keyword);
      })
      .catch((error) => {
        console.log('API getRecipe error: ', recipeId);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function getRecipeByRoute(route) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/recipe/route/${route}/`
    await axios
      .get(url)
      .then((response) => {
        let keyword = Cookies.get("keyword");
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

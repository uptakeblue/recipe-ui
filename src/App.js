// general
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material
import dayjs from 'dayjs';

// components
import Index from './pages';
import { DateitemDialogContext } from './components/AllContext';

///////////////////////

export default function App() {
  // constants ////////////

  const [calendarMonthItems, setCalendarMonthItems] = useState();
  const [searchResults, setSearchResults] = useState();
  const [keyword, setKeyword] = useState();
  const [searchDate, setSearchDate] = useState();

  const dateitemDialogContext = {
    putDateitem: putDateitem,
    postDateitem: postDateitem,
    deleteDateitem: deleteDateitem,
  };

  // useEffect ////////////

  useEffect(() => {
    getCalendarMonthItems(dayjs().format('YYYY-MM-DD'));
  }, []);

  // API //////////////////

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  async function getCalendarMonthItems(dateStr) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/calendar/month/${dateStr}`;
    await axios
      .get(url)
      .then((response) => {
        setCalendarMonthItems(response.data);
      })
      .catch((error) => {
        console.log('API getCalendarMonth error: ');
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function putDateitem(dateitemObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/dateitem/`;
    await axios
      .put(url, dateitemObj)
      .then((response) => {
        getCalendarMonthItems(dayjs(dateitemObj.date).format('YYYY-MM-DD'));
      })
      .catch((error) => {
        console.log('API putDateitem error: ', dateitemObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function postDateitem(dateitemObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/dateitem/`;
    await axios
      .post(url, dateitemObj)
      .then((response) => {
        getCalendarMonthItems(dayjs(dateitemObj.date).format('YYYY-MM-DD'));
      })
      .catch((error) => {
        console.log('API postDateitem error: ', dateitemObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function deleteDateitem(dateitemObj) {
    let url = `${process.env.REACT_APP_API_BASE_URL}/dateitem/${dateitemObj.dateitemId}`;
    await axios
      .delete(url)
      .then((response) => {
        getCalendarMonthItems(dayjs(dateitemObj.date).format('YYYY-MM-DD'));
      })
      .catch((error) => {
        console.log('API deleteDateitem error: ', dateitemObj);
        console.log('API error url: ', url);
        processError(error);
      });
  }

  async function getSearchResults(keyword) {
    if (!keyword) {
      setSearchResults(null)
    } else {
      let url = `${process.env.REACT_APP_API_BASE_URL}/dateitem/search/${keyword}/`;
      await axios
        .get(url)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.log('API getSearchResults error: ', keyword);
          console.log('API error url: ', url);
          processError(error);
        });
    }
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
    <DateitemDialogContext.Provider value={dateitemDialogContext}>
      <Index
        calendarMonthItems={calendarMonthItems}
        getCalendarMonthItems={getCalendarMonthItems}
        searchResults={searchResults}
        getSearchResults={getSearchResults}
        keyword={keyword}
        setKeyword={setKeyword}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
      />
    </DateitemDialogContext.Provider>
  );
}

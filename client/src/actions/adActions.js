import axios from 'axios';
import {
  GET_ADS,
  ADD_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  AD_ERROR,
  CLEAR_ADS,
  HIDE_AD_FORM,
  SHOW_AD_FORM,
  FILTER_ADS,
  USER_ADS,
  CLEAR_FILTER,
  SHOW_MARKED_AD
} from './types';

// Get ADs
export const getAds = () => async dispatch => {
  try {
    const res = await axios.get('/api/ads');

    dispatch({
      type: GET_ADS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Add AD
export const addAd = ad => async dispatch => {
  try {
    const geoCoder = await axios.get(
      `https://geocode-maps.yandex.ru/1.x?geocode=${ad.address}+Minsk,+Belarus&apikey=42fae72b-9e77-4e29-9f6e-97bc8568ba6b`
    );
    console.log(geoCoder);
    // ad.coords.lat = geoCoder.data[0].lat;
    // ad.coords.lon = geoCoder.data[0].lon;
    // console.log(ad);
  } catch {
    dispatch({
      type: AD_ERROR,
      payload: 'Check address format'
    });
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/ads', ad, config);

    dispatch({
      type: ADD_AD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete AD
export const deleteAd = id => async dispatch => {
  try {
    await axios.delete(`/api/ads/${id}`);

    dispatch({
      type: DELETE_AD,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Update AD
export const updateAd = ad => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/ads/${ad._id}`, ad, config);

    dispatch({
      type: UPDATE_AD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear ADs
export const clearAds = () => {
  return { type: CLEAR_ADS };
};

// Set Current AD
export const setCurrent = ad => {
  return { type: SET_CURRENT, payload: ad };
};

// Clear Current AD
export const clearCurrent = () => {
  return { type: CLEAR_CURRENT };
};

//Show AD form below map
export const showAdForm = () => {
  return { type: SHOW_AD_FORM };
};

//Hide AD form below map
export const hideAdForm = () => {
  return { type: HIDE_AD_FORM };
};

// Filter ADs
export const filterAds = text => {
  return { type: FILTER_ADS, payload: text };
};

// Show user ADs
export const showUserAds = id => {
  return { type: USER_ADS, payload: id };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

//Show Ad Selected on Map
export const showMarkedAd = id => {
  return { type: SHOW_MARKED_AD, payload: id };
};

import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/truck_reducer';
import {
  trucks_url,
  update_truck_url,
  create_new_truck
} from '../utils/constants';
import {
  CREATE_NEW_TRUCK,
  GET_TRUCKS_BEGIN,
  GET_TRUCKS_ERROR,
  GET_TRUCKS_SUCCESS,
  UPDATE_EXISTING_TRUCK,
  GET_SINGLE_TRUCK_BEGIN,
  GET_SINGLE_TRUCK_ERROR,
  GET_SINGLE_TRUCK_SUCCESS

} from '../actions';

const initialState = {
  trucks_loading: false,
  trucks_error: false,
  trucks: [],
  new_truck: {
    name: '',
    price: 50000,
    stock: 10,
    description: '',
    images: [],
    colors: [],
    sizes: [],
    category: '',
    company: '',
    shipping: true,
    featured: false,
  },
  single_truck_loading: false,
  single_truck_error: false,
  single_truck: {},
};

const TruckContext = React.createContext();

export const TruckProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    dispatch({ type: GET_TRUCKS_BEGIN });
    try {
      const response = await axios.get(trucks_url);
      const { data } = response.data;
      dispatch({ type: GET_TRUCKS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_TRUCKS_ERROR });
    }
  };

  const fetchSingleTruck = async (id) => {
    dispatch({ type: GET_SINGLE_TRUCK_BEGIN });
    try {
      const response = await axios.get(`${trucks_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_TRUCK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_TRUCK_ERROR });
    }
  };

  const deleteTruck = async (id) => {
    try {
      const response = await axios.delete(`${update_truck_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewTruckDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'price' || name === 'stock') {
      value = Number(value);
    }
    if (name === 'colors' || name === 'sizes') {
      value = value.replace(/\s+/g, '');
      if (value === '') {
        value = [];
      } else if (value.indexOf(',') > -1) {
        value = value.split(',');
      } else {
        value = value.split();
      }
    }
    if (name === 'shipping' || name === 'featured') {
      value = e.target.checked;
    }
    dispatch({ type: CREATE_NEW_TRUCK, payload: { name, value } });
  };

  const updateExistingTruckDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'price' || name === 'stock') {
      value = Number(value);
    }
    if (name === 'colors' || name === 'sizes') {
      value = value.replace(/\s+/g, '');
      if (value === '') {
        value = [];
      } else if (value.indexOf(',') > -1) {
        value = value.split(',');
      } else {
        value = value.split();
      }
    }
    if (name === 'shipping' || name === 'featured') {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_EXISTING_TRUCK, payload: { name, value } });
  };

  const createNewTruck = async (truck) => {
    try {
      const response = await axios.post(create_new_truck, truck);
      const { success, data } = response.data;
      fetchTrucks();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateTruck = async (id, truck) => {
    try {
      const response = await axios.put(`${update_truck_url}${id}`, truck);
      const { success, message } = response.data;
      // fetchTrucks();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  return (
    <TruckContext.Provider
      value={{
        ...state,
        deleteTruck,
        updateNewTruckDetails,
        updateExistingTruckDetails,
        createNewTruck,
        fetchTrucks,
        fetchSingleTruck,
        updateTruck,
        // deleteReview,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

export const useTruckContext = () => {
  return useContext(TruckContext);
};

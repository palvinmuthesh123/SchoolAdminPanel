import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/kitchen_reducer';
import {
  kitchens_url,
  update_kitchen_url,
  create_new_kitchen,
} from '../utils/constants';
import {
  CREATE_NEW_KITCHEN,
  GET_KITCHENS_BEGIN,
  GET_KITCHENS_ERROR,
  GET_KITCHENS_SUCCESS,
  UPDATE_EXISTING_KITCHEN,
  GET_SINGLE_KITCHEN_BEGIN,
  GET_SINGLE_KITCHEN_ERROR,
  GET_SINGLE_KITCHEN_SUCCESS
} from '../actions';

const initialState = {
  kitchens_loading: false,
  kitchens_error: false,
  kitchens: [],
  new_kitchen: {
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
  single_kitchen_loading: false,
  single_kitchen_error: false,
  single_kitchen: {},
};

const KitchenContext = React.createContext();

export const KitchenProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchKitchens = async () => {
    dispatch({ type: GET_KITCHENS_BEGIN });
    try {
      const response = await axios.get(kitchens_url);
      const { data } = response.data;
      dispatch({ type: GET_KITCHENS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_KITCHENS_ERROR });
    }
  };

  const fetchSingleKitchen = async (id) => {
    dispatch({ type: GET_SINGLE_KITCHEN_BEGIN });
    try {
      const response = await axios.get(`${kitchens_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_KITCHEN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_KITCHEN_ERROR });
    }
  };

  const deleteKitchen = async (id) => {
    try {
      const response = await axios.delete(`${update_kitchen_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewKitchenDetails = (e) => {
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
    dispatch({ type: CREATE_NEW_KITCHEN, payload: { name, value } });
  };

  const updateExistingKitchenDetails = (e) => {
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
    dispatch({ type: UPDATE_EXISTING_KITCHEN, payload: { name, value } });
  };

  const createNewKitchen = async (kitchen) => {
    try {
      const response = await axios.post(create_new_kitchen, kitchen);
      const { success, data } = response.data;
      fetchKitchens();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateKitchen = async (id, kitchen) => {
    try {
      const response = await axios.put(`${update_kitchen_url}${id}`, kitchen);
      const { success, message } = response.data;
      // fetchKitchens();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchKitchens();
  }, []);

  return (
    <KitchenContext.Provider
      value={{
        ...state,
        deleteKitchen,
        updateNewKitchenDetails,
        updateExistingKitchenDetails,
        createNewKitchen,
        fetchKitchens,
        fetchSingleKitchen,
        updateKitchen,
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
};

export const useKitchenContext = () => {
  return useContext(KitchenContext);
};

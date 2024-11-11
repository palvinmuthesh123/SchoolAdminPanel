import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/truckAssign_reducer';
import {
  get_truck_assign,
  delete_truck_assign,
  create_new_truckAssign
} from '../utils/constants';
import {
  CREATE_NEW_TRUCK_ASSIGN,
  GET_TRUCK_ASSIGNS_BEGIN,
  GET_TRUCK_ASSIGNS_ERROR,
  GET_TRUCK_ASSIGNS_SUCCESS,
  UPDATE_EXISTING_TRUCK_ASSIGN,
  GET_SINGLE_TRUCK_ASSIGN_BEGIN,
  GET_SINGLE_TRUCK_ASSIGN_ERROR,
  GET_SINGLE_TRUCK_ASSIGN_SUCCESS

} from '../actions';

const initialState = {
  truckAssigns_loading: false,
  truckAssigns_error: false,
  truckAssigns: [],
  new_truckAssign: {
    TruckID: '',
    // price: 50000,
    // stock: 10,
    description: '',
    images: [],
    // colors: [],
    // sizes: [],
    // category: '',
    // company: '',
    // shipping: true,
    // featured: false,
  },
  single_truckAssign_loading: false,
  single_truckAssign_error: false,
  single_truckAssign: {},
};

const TruckAssignContext = React.createContext();

export const TruckAssignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchTruckAssigns();
  }, []);

  const fetchTruckAssigns = async () => {
    dispatch({ type: GET_TRUCK_ASSIGNS_BEGIN });
    try {
      const response = await axios.get(get_truck_assign);
      // console.log(response, "RRRRRRRRRRRRRr")
      const { data } = response.data;
      dispatch({ type: GET_TRUCK_ASSIGNS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_TRUCK_ASSIGNS_ERROR });
    }
  };

  const fetchSingleTruckAssign = async (id) => {
    dispatch({ type: GET_SINGLE_TRUCK_ASSIGN_BEGIN });
    try {
      const response = await axios.get(`${get_truck_assign}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_TRUCK_ASSIGN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_TRUCK_ASSIGN_ERROR });
    }
  };

  const deleteTruckAssign = async (id) => {
    try {
      const response = await axios.delete(`${delete_truck_assign}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewTruckAssignDetails = (e) => {
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
    dispatch({ type: CREATE_NEW_TRUCK_ASSIGN, payload: { name, value } });
  };

  const updateExistingTruckAssignDetails = (e) => {
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
    dispatch({ type: UPDATE_EXISTING_TRUCK_ASSIGN, payload: { name, value } });
  };

  // const createNewTruckAssign = async (truckAssign) => {
  //   try {
  //     const response = await axios.post(create_new_truckAssign, truckAssign);
  //     const { success, data } = response.data;
  //     fetchTruckAssigns();
  //     return { success, data };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  // const updateTruckAssign = async (id, truckAssign) => {
  //   try {
  //     const response = await axios.put(`${update_truckAssign_url}${id}`, truckAssign);
  //     const { success, message } = response.data;
  //     // fetchTruckAssigns();
  //     return { success, message };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  return (
    <TruckAssignContext.Provider
      value={{
        ...state,
        deleteTruckAssign,
        updateNewTruckAssignDetails,
        updateExistingTruckAssignDetails,
        // createNewTruckAssign,
        fetchTruckAssigns,
        fetchSingleTruckAssign,
        // updateTruckAssign,
        // deleteReview,
      }}
    >
      {children}
    </TruckAssignContext.Provider>
  );
};

export const useTruckAssignContext = () => {
  return useContext(TruckAssignContext);
};

import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/containerAssign_reducer';
import {
  get_container_assign,
  delete_container_assign,
  // create_new_containerAssign,
} from '../utils/constants';
import {
  CREATE_NEW_CONTAINER_ASSIGN,
  GET_CONTAINER_ASSIGNS_BEGIN,
  GET_CONTAINER_ASSIGNS_ERROR,
  GET_CONTAINER_ASSIGNS_SUCCESS,
  UPDATE_EXISTING_CONTAINER_ASSIGN,
  GET_SINGLE_CONTAINER_ASSIGN_BEGIN,
  GET_SINGLE_CONTAINER_ASSIGN_ERROR,
  GET_SINGLE_CONTAINER_ASSIGN_SUCCESS
} from '../actions';

const initialState = {
  containerAssigns_loading: false,
  containerAssigns_error: false,
  containerAssigns: [],
  new_containerAssign: {
    containerAssignId: '',
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
  single_containerAssign_loading: false,
  single_containerAssign_error: false,
  single_containerAssign: {},
};

const ContainerAssignContext = React.createContext();

export const ContainerAssignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContainerAssigns = async () => {
    dispatch({ type: GET_CONTAINER_ASSIGNS_BEGIN });
    try {
      const response = await axios.get(get_container_assign);
      // console.log(response, "PPPPPPPPPPPPPP")
      const { data } = response.data;
      dispatch({ type: GET_CONTAINER_ASSIGNS_SUCCESS, payload: data });
    } catch (error) {
      // console.log(error, "PPPPPPPPPPPPPP")
      dispatch({ type: GET_CONTAINER_ASSIGNS_ERROR });
    }
  };

  const fetchSingleContainerAssign = async (id) => {
    // dispatch({ type: GET_SINGLE_CONTAINER_ASSIGN_BEGIN });
    // try {
    //   const response = await axios.get(`${containerAssigns_url}${id}`);
    //   const { data } = response.data;
    //   dispatch({ type: GET_SINGLE_CONTAINER_ASSIGN_SUCCESS, payload: data });
    // } catch (error) {
    //   dispatch({ type: GET_SINGLE_CONTAINER_ASSIGN_ERROR });
    // }
  };

  const deleteContainerAssign = async (id) => {
    try {
      const response = await axios.delete(`${delete_container_assign}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewContainerAssignDetails = (e) => {
    // const name = e.target.name;
    // let value = e.target.value;
    // if (name === 'price' || name === 'stock') {
    //   value = Number(value);
    // }
    // if (name === 'colors' || name === 'sizes') {
    //   value = value.replace(/\s+/g, '');
    //   if (value === '') {
    //     value = [];
    //   } else if (value.indexOf(',') > -1) {
    //     value = value.split(',');
    //   } else {
    //     value = value.split();
    //   }
    // }
    // if (name === 'shipping' || name === 'featured') {
    //   value = e.target.checked;
    // }
    // dispatch({ type: CREATE_NEW_CONTAINER_ASSIGN, payload: { name, value } });
  };

  const updateExistingContainerAssignDetails = (e) => {
    // const name = e.target.name;
    // let value = e.target.value;
    // if (name === 'price' || name === 'stock') {
    //   value = Number(value);
    // }
    // if (name === 'colors' || name === 'sizes') {
    //   value = value.replace(/\s+/g, '');
    //   if (value === '') {
    //     value = [];
    //   } else if (value.indexOf(',') > -1) {
    //     value = value.split(',');
    //   } else {
    //     value = value.split();
    //   }
    // }
    // if (name === 'shipping' || name === 'featured') {
    //   value = e.target.checked;
    // }
    // dispatch({ type: UPDATE_EXISTING_CONTAINER_ASSIGN, payload: { name, value } });
  };

  const createNewContainerAssign = async (containerAssign) => {
    // try {
    //   const response = await axios.post(create_new_containerAssign, containerAssign);
    //   const { success, data } = response.data;
    //   fetchContainerAssigns();
    //   return { success, data };
    // } catch (error) {
    //   const { success, message } = error.response.data;
    //   return { success, message };
    // }
  };

  const updateContainerAssign = async (id, containerAssign) => {
    // try {
    //   const response = await axios.put(`${update_containerAssign_url}${id}`, containerAssign);
    //   const { success, message } = response.data;
    //   // fetchContainerAssigns();
    //   return { success, message };
    // } catch (error) {
    //   const { success, message } = error.response.data;
    //   return { success, message };
    // }
  };

  // const deleteReview = async (containerAssignId, reviewId) => {
  //   try {
  //     const response = await axios.delete(`${delete_review}${containerAssignId}`, {
  //       data: {
  //         reviewId,
  //       },
  //     });
  //     const { success, message } = response.data;
  //     fetchSingleContainerAssign(containerAssignId);
  //     return { success, message };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  useEffect(() => {
    fetchContainerAssigns();
  }, []);

  return (
    <ContainerAssignContext.Provider
      value={{
        ...state,
        deleteContainerAssign,
        updateNewContainerAssignDetails,
        updateExistingContainerAssignDetails,
        createNewContainerAssign,
        fetchContainerAssigns,
        fetchSingleContainerAssign,
        updateContainerAssign,
        // deleteReview,
      }}
    >
      {children}
    </ContainerAssignContext.Provider>
  );
};

export const useContainerAssignContext = () => {
  return useContext(ContainerAssignContext);
};

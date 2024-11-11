import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/container_reducer';
import {
  containers_url,
  update_container_url,
  create_new_container,
} from '../utils/constants';
import {
  CREATE_NEW_CONTAINER,
  GET_CONTAINERS_BEGIN,
  GET_CONTAINERS_ERROR,
  GET_CONTAINERS_SUCCESS,
  UPDATE_EXISTING_CONTAINER,
  GET_SINGLE_CONTAINER_BEGIN,
  GET_SINGLE_CONTAINER_ERROR,
  GET_SINGLE_CONTAINER_SUCCESS
} from '../actions';

const initialState = {
  containers_loading: false,
  containers_error: false,
  containers: [],
  new_container: {
    containerId: '',
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
  single_container_loading: false,
  single_container_error: false,
  single_container: {},
};

const ContainerContext = React.createContext();

export const ContainerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContainers = async () => {
    dispatch({ type: GET_CONTAINERS_BEGIN });
    try {
      const response = await axios.get(containers_url);
      const { data } = response.data;
      dispatch({ type: GET_CONTAINERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CONTAINERS_ERROR });
    }
  };

  const fetchSingleContainer = async (id) => {
    dispatch({ type: GET_SINGLE_CONTAINER_BEGIN });
    try {
      const response = await axios.get(`${containers_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_CONTAINER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_CONTAINER_ERROR });
    }
  };

  const deleteContainer = async (id) => {
    try {
      const response = await axios.delete(`${update_container_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewContainerDetails = (e) => {
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
    dispatch({ type: CREATE_NEW_CONTAINER, payload: { name, value } });
  };

  const updateExistingContainerDetails = (e) => {
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
    dispatch({ type: UPDATE_EXISTING_CONTAINER, payload: { name, value } });
  };

  const createNewContainer = async (container) => {
    try {
      const response = await axios.post(create_new_container, container);
      const { success, data } = response.data;
      fetchContainers();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateContainer = async (id, container) => {
    try {
      const response = await axios.put(`${update_container_url}${id}`, container);
      const { success, message } = response.data;
      // fetchContainers();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  // const deleteReview = async (containerId, reviewId) => {
  //   try {
  //     const response = await axios.delete(`${delete_review}${containerId}`, {
  //       data: {
  //         reviewId,
  //       },
  //     });
  //     const { success, message } = response.data;
  //     fetchSingleContainer(containerId);
  //     return { success, message };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  useEffect(() => {
    fetchContainers();
  }, []);

  return (
    <ContainerContext.Provider
      value={{
        ...state,
        deleteContainer,
        updateNewContainerDetails,
        updateExistingContainerDetails,
        createNewContainer,
        fetchContainers,
        fetchSingleContainer,
        updateContainer,
        // deleteReview,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};

export const useContainerContext = () => {
  return useContext(ContainerContext);
};

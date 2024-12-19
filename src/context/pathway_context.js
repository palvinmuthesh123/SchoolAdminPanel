import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/pathway_reducer';
import {
  pathways_url,
  update_pathway_url,
  create_new_pathway,
} from '../utils/constants';
import {
  CREATE_NEW_PATHWAY,
  GET_PATHWAYS_BEGIN,
  GET_PATHWAYS_ERROR,
  GET_PATHWAYS_SUCCESS,
  UPDATE_EXISTING_PATHWAY,
  GET_SINGLE_PATHWAY_BEGIN,
  GET_SINGLE_PATHWAY_ERROR,
  GET_SINGLE_PATHWAY_SUCCESS
} from '../actions';

const initialState = {
  pathways_loading: false,
  pathways_error: false,
  pathways: [],
  new_pathway: {
    pathwayId: '',
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
  single_pathway_loading: false,
  single_pathway_error: false,
  single_pathway: {},
};

const PathwayContext = React.createContext();

export const PathwayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPathways = async () => {
    dispatch({ type: GET_PATHWAYS_BEGIN });
    try {
      const response = await axios.get(pathways_url);
      const { data } = response.data;
      dispatch({ type: GET_PATHWAYS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PATHWAYS_ERROR });
    }
  };

  const fetchSinglePathway = async (id) => {
    dispatch({ type: GET_SINGLE_PATHWAY_BEGIN });
    try {
      const response = await axios.get(`${pathways_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_PATHWAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PATHWAY_ERROR });
    }
  };

  const deletePathway = async (id) => {
    try {
      const response = await axios.delete(`${update_pathway_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewPathwayDetails = (e) => {
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
    dispatch({ type: CREATE_NEW_PATHWAY, payload: { name, value } });
  };

  const updateExistingPathwayDetails = (e) => {
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
    dispatch({ type: UPDATE_EXISTING_PATHWAY, payload: { name, value } });
  };

  const createNewPathway = async (pathway) => {
    try {
      const response = await axios.post(create_new_pathway, pathway);
      const { success, data } = response.data;
      fetchPathways();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updatePathway = async (id, pathway) => {
    try {
      const response = await axios.put(`${update_pathway_url}${id}`, pathway);
      const { success, message } = response.data;
      // fetchPathways();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  // const deleteReview = async (pathwayId, reviewId) => {
  //   try {
  //     const response = await axios.delete(`${delete_review}${pathwayId}`, {
  //       data: {
  //         reviewId,
  //       },
  //     });
  //     const { success, message } = response.data;
  //     fetchSinglePathway(pathwayId);
  //     return { success, message };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  useEffect(() => {
    fetchPathways();
  }, []);

  return (
    <PathwayContext.Provider
      value={{
        ...state,
        deletePathway,
        updateNewPathwayDetails,
        updateExistingPathwayDetails,
        createNewPathway,
        fetchPathways,
        fetchSinglePathway,
        updatePathway,
        // deleteReview,
      }}
    >
      {children}
    </PathwayContext.Provider>
  );
};

export const usePathwayContext = () => {
  return useContext(PathwayContext);
};

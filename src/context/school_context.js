import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/school_reducer';
import {
  schools_url,
  update_school_url,
  create_new_school,
} from '../utils/constants';
import {
  CREATE_NEW_SCHOOL,
  GET_SCHOOLS_BEGIN,
  GET_SCHOOLS_ERROR,
  GET_SCHOOLS_SUCCESS,
  UPDATE_EXISTING_SCHOOL,
  GET_SINGLE_SCHOOL_BEGIN,
  GET_SINGLE_SCHOOL_ERROR,
  GET_SINGLE_SCHOOL_SUCCESS
} from '../actions';

const initialState = {
  schools_loading: false,
  schools_error: false,
  schools: [],
  new_school: {
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
  single_school_loading: false,
  single_school_error: false,
  single_school: {},
};

const SchoolContext = React.createContext();

export const SchoolProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchSchools = async () => {
    dispatch({ type: GET_SCHOOLS_BEGIN });
    try {
      const response = await axios.get(schools_url);
      const { data } = response.data;
      dispatch({ type: GET_SCHOOLS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SCHOOLS_ERROR });
    }
  };

  const fetchSingleSchool = async (id) => {
    dispatch({ type: GET_SINGLE_SCHOOL_BEGIN });
    try {
      const response = await axios.get(`${schools_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_SCHOOL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_SCHOOL_ERROR });
    }
  };

  const deleteSchool = async (id) => {
    try {
      const response = await axios.delete(`${update_school_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewSchoolDetails = (e) => {
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
    dispatch({ type: CREATE_NEW_SCHOOL, payload: { name, value } });
  };

  const updateExistingSchoolDetails = (e) => {
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
    dispatch({ type: UPDATE_EXISTING_SCHOOL, payload: { name, value } });
  };

  const createNewSchool = async (school) => {
    try {
      const response = await axios.post(create_new_school, school);
      const { success, data } = response.data;
      fetchSchools();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateSchool = async (id, school) => {
    try {
      const response = await axios.put(`${update_school_url}${id}`, school);
      console.log(`${update_school_url}${id}`, "UUUUUUUUUUUUUUUUU");
      const { success, message } = response.data;
      // fetchSchools();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  // const deleteReview = async (schoolId, reviewId) => {
  //   try {
  //     const response = await axios.delete(`${delete_review}${schoolId}`, {
  //       data: {
  //         reviewId,
  //       },
  //     });
  //     const { success, message } = response.data;
  //     fetchSingleSchool(schoolId);
  //     return { success, message };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <SchoolContext.Provider
      value={{
        ...state,
        deleteSchool,
        updateNewSchoolDetails,
        updateExistingSchoolDetails,
        createNewSchool,
        fetchSchools,
        fetchSingleSchool,
        updateSchool,
        // deleteReview,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => {
  return useContext(SchoolContext);
};

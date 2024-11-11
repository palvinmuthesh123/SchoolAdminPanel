import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/productAssign_reducer';
import {
  get_cooker_assign,
  delete_cooker_assign,
  create_new_productAssign,
  delete_review,
} from '../utils/constants';
import {
  CREATE_NEW_PRODUCT_ASSIGN,
  GET_PRODUCT_ASSIGNS_BEGIN,
  GET_PRODUCT_ASSIGNS_ERROR,
  GET_PRODUCT_ASSIGNS_SUCCESS,
  UPDATE_EXISTING_PRODUCT_ASSIGN,
  GET_SINGLE_PRODUCT_ASSIGN_BEGIN,
  GET_SINGLE_PRODUCT_ASSIGN_ERROR,
  GET_SINGLE_PRODUCT_ASSIGN_SUCCESS,
} from '../actions';

const initialState = {
  productAssigns_loading: false,
  productAssigns_error: false,
  productAssigns: [],
  new_productAssign: {
    cookerId: '',
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
  single_productAssign_loading: false,
  single_productAssign_error: false,
  single_productAssign: {},
};

const ProductAssignContext = React.createContext();

export const ProductAssignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProductAssigns = async () => {
    dispatch({ type: GET_PRODUCT_ASSIGNS_BEGIN });
    try {
      const response = await axios.get(get_cooker_assign);
      console.log(response, "PPPPPPPPPPPPPP")
      const { data } = response.data;
      dispatch({ type: GET_PRODUCT_ASSIGNS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_ASSIGNS_ERROR });
    }
  };

  const fetchSingleProductAssign = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_ASSIGN_BEGIN });
    try {
      const response = await axios.get(`${get_cooker_assign}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_ASSIGN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ASSIGN_ERROR });
    }
  };

  const deleteProductAssign = async (id) => {
    try {
      const response = await axios.delete(`${delete_cooker_assign}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  // const updateNewProductAssignDetails = (e) => {
  //   const name = e.target.name;
  //   let value = e.target.value;
  //   if (name === 'price' || name === 'stock') {
  //     value = Number(value);
  //   }
  //   if (name === 'colors' || name === 'sizes') {
  //     value = value.replace(/\s+/g, '');
  //     if (value === '') {
  //       value = [];
  //     } else if (value.indexOf(',') > -1) {
  //       value = value.split(',');
  //     } else {
  //       value = value.split();
  //     }
  //   }
  //   if (name === 'shipping' || name === 'featured') {
  //     value = e.target.checked;
  //   }
  //   dispatch({ type: CREATE_NEW_PRODUCT_ASSIGN, payload: { name, value } });
  // };

  // const updateExistingProductAssignDetails = (e) => {
  //   const name = e.target.name;
  //   let value = e.target.value;
  //   if (name === 'price' || name === 'stock') {
  //     value = Number(value);
  //   }
  //   if (name === 'colors' || name === 'sizes') {
  //     value = value.replace(/\s+/g, '');
  //     if (value === '') {
  //       value = [];
  //     } else if (value.indexOf(',') > -1) {
  //       value = value.split(',');
  //     } else {
  //       value = value.split();
  //     }
  //   }
  //   if (name === 'shipping' || name === 'featured') {
  //     value = e.target.checked;
  //   }
  //   dispatch({ type: UPDATE_EXISTING_PRODUCT_ASSIGN, payload: { name, value } });
  // };

  // const createNewProductAssign = async (productAssign) => {
  //   try {
  //     const response = await axios.post(create_new_productAssign, productAssign);
  //     const { success, data } = response.data;
  //     fetchProductAssigns();
  //     return { success, data };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  // const updateProductAssign = async (id, productAssign) => {
  //   try {
  //     const response = await axios.put(`${update_productAssign_url}${id}`, productAssign);
  //     const { success, message } = response.data;
  //     // fetchProductAssigns();
  //     return { success, message };
  //   } catch (error) {
  //     const { success, message } = error.response.data;
  //     return { success, message };
  //   }
  // };

  const deleteReview = async (productAssignId, reviewId) => {
    try {
      const response = await axios.delete(`${delete_review}${productAssignId}`, {
        data: {
          reviewId,
        },
      });
      const { success, message } = response.data;
      fetchSingleProductAssign(productAssignId);
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchProductAssigns();
  }, []);

  return (
    <ProductAssignContext.Provider
      value={{
        ...state,
        deleteProductAssign,
        // updateNewProductAssignDetails,
        // updateExistingProductAssignDetails,
        // createNewProductAssign,
        fetchProductAssigns,
        fetchSingleProductAssign,
        // updateProductAssign,
        deleteReview,
      }}
    >
      {children}
    </ProductAssignContext.Provider>
  );
};

export const useProductAssignContext = () => {
  return useContext(ProductAssignContext);
};

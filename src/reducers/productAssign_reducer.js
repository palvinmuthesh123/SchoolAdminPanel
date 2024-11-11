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

const productAssign_reducer = (state, action) => {
  if (action.type === GET_PRODUCT_ASSIGNS_BEGIN) {
    return { ...state, productAssigns_error: false, productAssigns_loading: true };
  }
  if (action.type === GET_PRODUCT_ASSIGNS_ERROR) {
    return { ...state, productAssigns_error: true, productAssigns_loading: false };
  }
  if (action.type === GET_PRODUCT_ASSIGNS_SUCCESS) {
    return {
      ...state,
      productAssigns_loading: false,
      productAssigns: action.payload,
    };
  }
  if (action.type === CREATE_NEW_PRODUCT_ASSIGN) {
    const { name, value } = action.payload;
    return { ...state, new_productAssign: { ...state.new_productAssign, [name]: value } };
  }
  if (action.type === GET_SINGLE_PRODUCT_ASSIGN_BEGIN) {
    return {
      ...state,
      single_productAssign_error: false,
      single_productAssign_loading: true,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ASSIGN_ERROR) {
    return {
      ...state,
      single_productAssign_error: true,
      single_productAssign_loading: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ASSIGN_SUCCESS) {
    return {
      ...state,
      single_productAssign_loading: false,
      single_productAssign: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_PRODUCT_ASSIGN) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_productAssign: { ...state.single_productAssign, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default productAssign_reducer;

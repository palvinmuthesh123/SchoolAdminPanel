import {
  CREATE_NEW_KITCHEN,
  GET_KITCHENS_BEGIN,
  GET_KITCHENS_ERROR,
  GET_KITCHENS_SUCCESS,
  UPDATE_EXISTING_KITCHEN,
  GET_SINGLE_KITCHEN_BEGIN,
  GET_SINGLE_KITCHEN_ERROR,
  GET_SINGLE_KITCHEN_SUCCESS,
} from '../actions';

const kitchen_reducer = (state, action) => {
  if (action.type === GET_KITCHENS_BEGIN) {
    return { ...state, kitchens_error: false, kitchens_loading: true };
  }
  if (action.type === GET_KITCHENS_ERROR) {
    return { ...state, kitchens_error: true, kitchens_loading: false };
  }
  if (action.type === GET_KITCHENS_SUCCESS) {
    return {
      ...state,
      kitchens_loading: false,
      kitchens: action && action.payload ? action.payload : [],
    };
  }
  if (action.type === CREATE_NEW_KITCHEN) {
    const { name, value } = action.payload;
    return { ...state, new_kitchen: { ...state.new_kitchen, [name]: value } };
  }
  if (action.type === GET_SINGLE_KITCHEN_BEGIN) {
    return {
      ...state,
      single_kitchen_error: false,
      single_kitchen_loading: true,
    };
  }
  if (action.type === GET_SINGLE_KITCHEN_ERROR) {
    return {
      ...state,
      single_kitchen_error: true,
      single_kitchen_loading: false,
    };
  }
  if (action.type === GET_SINGLE_KITCHEN_SUCCESS) {
    return {
      ...state,
      single_kitchen_loading: false,
      single_kitchen: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_KITCHEN) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_kitchen: { ...state.single_kitchen, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default kitchen_reducer;

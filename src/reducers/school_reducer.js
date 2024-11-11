import {
  CREATE_NEW_SCHOOL,
  GET_SCHOOLS_BEGIN,
  GET_SCHOOLS_ERROR,
  GET_SCHOOLS_SUCCESS,
  UPDATE_EXISTING_SCHOOL,
  GET_SINGLE_SCHOOL_BEGIN,
  GET_SINGLE_SCHOOL_ERROR,
  GET_SINGLE_SCHOOL_SUCCESS,
} from '../actions';

const school_reducer = (state, action) => {
  if (action.type === GET_SCHOOLS_BEGIN) {
    return { ...state, schools_error: false, schools_loading: true };
  }
  if (action.type === GET_SCHOOLS_ERROR) {
    return { ...state, schools_error: true, schools_loading: false };
  }
  if (action.type === GET_SCHOOLS_SUCCESS) {
    return {
      ...state,
      schools_loading: false,
      schools: action.payload,
    };
  }
  if (action.type === CREATE_NEW_SCHOOL) {
    const { name, value } = action.payload;
    return { ...state, new_school: { ...state.new_school, [name]: value } };
  }
  if (action.type === GET_SINGLE_SCHOOL_BEGIN) {
    return {
      ...state,
      single_school_error: false,
      single_school_loading: true,
    };
  }
  if (action.type === GET_SINGLE_SCHOOL_ERROR) {
    return {
      ...state,
      single_school_error: true,
      single_school_loading: false,
    };
  }
  if (action.type === GET_SINGLE_SCHOOL_SUCCESS) {
    return {
      ...state,
      single_school_loading: false,
      single_school: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_SCHOOL) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_school: { ...state.single_school, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default school_reducer;

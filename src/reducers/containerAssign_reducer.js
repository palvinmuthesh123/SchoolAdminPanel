import {
  CREATE_NEW_CONTAINER_ASSIGN,
  GET_CONTAINER_ASSIGNS_BEGIN,
  GET_CONTAINER_ASSIGNS_ERROR,
  GET_CONTAINER_ASSIGNS_SUCCESS,
  UPDATE_EXISTING_CONTAINER_ASSIGN,
  GET_SINGLE_CONTAINER_ASSIGN_BEGIN,
  GET_SINGLE_CONTAINER_ASSIGN_ERROR,
  GET_SINGLE_CONTAINER_ASSIGN_SUCCESS,
} from '../actions';

const containerAssign_reducer = (state, action) => {
  if (action.type === GET_CONTAINER_ASSIGNS_BEGIN) {
    return { ...state, containerAssigns_error: false, containerAssigns_loading: true };
  }
  if (action.type === GET_CONTAINER_ASSIGNS_ERROR) {
    return { ...state, containerAssigns_error: true, containerAssigns_loading: false };
  }
  if (action.type === GET_CONTAINER_ASSIGNS_SUCCESS) {
    return {
      ...state,
      containerAssigns_loading: false,
      containerAssigns: action.payload,
    };
  }
  if (action.type === CREATE_NEW_CONTAINER_ASSIGN) {
    const { name, value } = action.payload;
    return { ...state, new_containerAssign: { ...state.new_containerAssign, [name]: value } };
  }
  if (action.type === GET_SINGLE_CONTAINER_ASSIGN_BEGIN) {
    return {
      ...state,
      single_containerAssign_error: false,
      single_containerAssign_loading: true,
    };
  }
  if (action.type === GET_SINGLE_CONTAINER_ASSIGN_ERROR) {
    return {
      ...state,
      single_containerAssign_error: true,
      single_containerAssign_loading: false,
    };
  }
  if (action.type === GET_SINGLE_CONTAINER_ASSIGN_SUCCESS) {
    return {
      ...state,
      single_containerAssign_loading: false,
      single_containerAssign: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_CONTAINER_ASSIGN) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_containerAssign: { ...state.single_containerAssign, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default containerAssign_reducer;

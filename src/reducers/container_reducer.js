import {
  CREATE_NEW_CONTAINER,
  GET_CONTAINERS_BEGIN,
  GET_CONTAINERS_ERROR,
  GET_CONTAINERS_SUCCESS,
  UPDATE_EXISTING_CONTAINER,
  GET_SINGLE_CONTAINER_BEGIN,
  GET_SINGLE_CONTAINER_ERROR,
  GET_SINGLE_CONTAINER_SUCCESS,
} from '../actions';

const container_reducer = (state, action) => {
  if (action.type === GET_CONTAINERS_BEGIN) {
    return { ...state, containers_error: false, containers_loading: true };
  }
  if (action.type === GET_CONTAINERS_ERROR) {
    return { ...state, containers_error: true, containers_loading: false };
  }
  if (action.type === GET_CONTAINERS_SUCCESS) {
    return {
      ...state,
      containers_loading: false,
      containers: action.payload,
    };
  }
  if (action.type === CREATE_NEW_CONTAINER) {
    const { name, value } = action.payload;
    return { ...state, new_container: { ...state.new_container, [name]: value } };
  }
  if (action.type === GET_SINGLE_CONTAINER_BEGIN) {
    return {
      ...state,
      single_container_error: false,
      single_container_loading: true,
    };
  }
  if (action.type === GET_SINGLE_CONTAINER_ERROR) {
    return {
      ...state,
      single_container_error: true,
      single_container_loading: false,
    };
  }
  if (action.type === GET_SINGLE_CONTAINER_SUCCESS) {
    return {
      ...state,
      single_container_loading: false,
      single_container: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_CONTAINER) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_container: { ...state.single_container, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default container_reducer;

import {
  CREATE_NEW_TRUCK,
  GET_TRUCKS_BEGIN,
  GET_TRUCKS_ERROR,
  GET_TRUCKS_SUCCESS,
  UPDATE_EXISTING_TRUCK,
  GET_SINGLE_TRUCK_BEGIN,
  GET_SINGLE_TRUCK_ERROR,
  GET_SINGLE_TRUCK_SUCCESS,
} from '../actions';

const truck_reducer = (state, action) => {
  if (action.type === GET_TRUCKS_BEGIN) {
    return { ...state, trucks_error: false, trucks_loading: true };
  }
  if (action.type === GET_TRUCKS_ERROR) {
    return { ...state, trucks_error: true, trucks_loading: false };
  }
  if (action.type === GET_TRUCKS_SUCCESS) {
    return {
      ...state,
      trucks_loading: false,
      trucks: action.payload,
    };
  }
  if (action.type === CREATE_NEW_TRUCK) {
    const { name, value } = action.payload;
    return { ...state, new_truck: { ...state.new_truck, [name]: value } };
  }
  if (action.type === GET_SINGLE_TRUCK_BEGIN) {
    return {
      ...state,
      single_truck_error: false,
      single_truck_loading: true,
    };
  }
  if (action.type === GET_SINGLE_TRUCK_ERROR) {
    return {
      ...state,
      single_truck_error: true,
      single_truck_loading: false,
    };
  }
  if (action.type === GET_SINGLE_TRUCK_SUCCESS) {
    return {
      ...state,
      single_truck_loading: false,
      single_truck: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_TRUCK) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_truck: { ...state.single_truck, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default truck_reducer;

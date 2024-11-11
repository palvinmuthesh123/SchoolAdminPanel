import {
  CREATE_NEW_TRUCK_ASSIGN,
  GET_TRUCK_ASSIGNS_BEGIN,
  GET_TRUCK_ASSIGNS_ERROR,
  GET_TRUCK_ASSIGNS_SUCCESS,
  UPDATE_EXISTING_TRUCK_ASSIGN,
  GET_SINGLE_TRUCK_ASSIGN_BEGIN,
  GET_SINGLE_TRUCK_ASSIGN_ERROR,
  GET_SINGLE_TRUCK_ASSIGN_SUCCESS,
} from '../actions';

const truckAssign_reducer = (state, action) => {
  if (action.type === GET_TRUCK_ASSIGNS_BEGIN) {
    return { ...state, truckAssigns_error: false, truckAssigns_loading: true };
  }
  if (action.type === GET_TRUCK_ASSIGNS_ERROR) {
    return { ...state, truckAssigns_error: true, truckAssigns_loading: false };
  }
  if (action.type === GET_TRUCK_ASSIGNS_SUCCESS) {
    return {
      ...state,
      truckAssigns_loading: false,
      truckAssigns: action.payload,
    };
  }
  if (action.type === CREATE_NEW_TRUCK_ASSIGN) {
    const { name, value } = action.payload;
    return { ...state, new_truckAssign: { ...state.new_truckAssign, [name]: value } };
  }
  if (action.type === GET_SINGLE_TRUCK_ASSIGN_BEGIN) {
    return {
      ...state,
      single_truckAssign_error: false,
      single_truckAssign_loading: true,
    };
  }
  if (action.type === GET_SINGLE_TRUCK_ASSIGN_ERROR) {
    return {
      ...state,
      single_truckAssign_error: true,
      single_truckAssign_loading: false,
    };
  }
  if (action.type === GET_SINGLE_TRUCK_ASSIGN_SUCCESS) {
    return {
      ...state,
      single_truckAssign_loading: false,
      single_truckAssign: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_TRUCK_ASSIGN) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_truckAssign: { ...state.single_truckAssign, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default truckAssign_reducer;

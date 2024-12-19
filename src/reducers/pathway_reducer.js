import {
  CREATE_NEW_PATHWAY,
  GET_PATHWAYS_BEGIN,
  GET_PATHWAYS_ERROR,
  GET_PATHWAYS_SUCCESS,
  UPDATE_EXISTING_PATHWAY,
  GET_SINGLE_PATHWAY_BEGIN,
  GET_SINGLE_PATHWAY_ERROR,
  GET_SINGLE_PATHWAY_SUCCESS,
} from '../actions';

const pathway_reducer = (state, action) => {
  if (action.type === GET_PATHWAYS_BEGIN) {
    return { ...state, pathways_error: false, pathways_loading: true };
  }
  if (action.type === GET_PATHWAYS_ERROR) {
    return { ...state, pathways_error: true, pathways_loading: false };
  }
  if (action.type === GET_PATHWAYS_SUCCESS) {
    return {
      ...state,
      pathways_loading: false,
      pathways: action.payload,
    };
  }
  if (action.type === CREATE_NEW_PATHWAY) {
    const { name, value } = action.payload;
    return { ...state, new_pathway: { ...state.new_pathway, [name]: value } };
  }
  if (action.type === GET_SINGLE_PATHWAY_BEGIN) {
    return {
      ...state,
      single_pathway_error: false,
      single_pathway_loading: true,
    };
  }
  if (action.type === GET_SINGLE_PATHWAY_ERROR) {
    return {
      ...state,
      single_pathway_error: true,
      single_pathway_loading: false,
    };
  }
  if (action.type === GET_SINGLE_PATHWAY_SUCCESS) {
    return {
      ...state,
      single_pathway_loading: false,
      single_pathway: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_PATHWAY) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_pathway: { ...state.single_pathway, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default pathway_reducer;

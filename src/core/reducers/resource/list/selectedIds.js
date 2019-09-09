import { DELETE, DELETE_MANY } from '@/core/dataFetchActions';
import {
  SET_LIST_SELECTED_IDS,
  TOGGLE_LIST_ITEM,
} from '@/core/actions/resourceActions/listActions';

const initialState = [];

const selectedIdsReducer = (previousState = initialState, action) => {
  if (action.type === SET_LIST_SELECTED_IDS) {
    return action.payload;
  }
  if (action.type === TOGGLE_LIST_ITEM) {
    const index = previousState.indexOf(action.payload);
    if (index > -1) {
      return [
        ...previousState.slice(0, index),
        ...previousState.slice(index + 1),
      ];
    }
    return [...previousState, action.payload];
  }

  if (action.meta && action.meta.optimistic) {
    if (action.meta.fetch === DELETE) {
      const index = previousState.indexOf(action.payload.id);
      if (index === -1) {
        return previousState;
      }
      return [
        ...previousState.slice(0, index),
        ...previousState.slice(index + 1),
      ];
    }
    if (action.meta.fetch === DELETE_MANY) {
      return previousState.filter(id => !action.payload.ids.includes(id));
    }
  }

  return action.meta && action.meta.unselectAll ? initialState : previousState;
};

export default selectedIdsReducer;

import { filterItems } from '../utils/filterItems';

const defaultState = {
  checkboxes: new Array(filterItems.length).fill(false),
};
export const checkboxReducer = (
  state: {
    checkboxes: boolean[];
  } = defaultState,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case 'clickCheck':
      if (action.payload === 0 && state.checkboxes[0]) {
        return { ...defaultState };
      }
      if (action.payload === 0 && !state.checkboxes[0]) {
        return {
          ...state,
          checkboxes: defaultState.checkboxes.map((item) => !item),
        };
      }
      return {
        ...state,
        checkboxes: state.checkboxes.map((item, index) => {
          return index === action.payload ? !item : item;
        }),
      };
    default:
      return state;
  }
};

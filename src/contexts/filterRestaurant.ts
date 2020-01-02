import { createContext, Dispatch } from 'react';

export type FilterState = {
  range: number | null;
  query: string;
  lunch: boolean;
  bottomLessCup: boolean;
  buffet: boolean;
  privateRoom: boolean;
  webReserve: boolean;
};

export type FilterAction =
  | { type: 'changeRange'; payload: number }
  | { type: 'changeQuery'; payload: string }
  | { type: 'toggleLunch' }
  | { type: 'toggleBottomLessCup' }
  | { type: 'toggleBuffet' }
  | { type: 'togglePrivateRoom' }
  | { type: 'toggleWebReserve' };

const initialFilterState: FilterState = {
  range: null,
  query: '',
  lunch: false,
  bottomLessCup: false,
  buffet: false,
  privateRoom: false,
  webReserve: false,
};

type FilterRestaurant = {
  filterState: FilterState;
  filterDispatch: Dispatch<FilterAction>;
};

export const FilterRestaurantContext = createContext<FilterRestaurant>({
  filterState: initialFilterState,
  // eslint-disable-next-line
  filterDispatch: () => {},
});

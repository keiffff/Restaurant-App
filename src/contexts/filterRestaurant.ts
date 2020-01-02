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
  | { type: 'changeRange'; payload: number | null }
  | { type: 'changeQuery'; payload: string }
  | { type: 'toggleLunch'; payload: boolean }
  | { type: 'toggleBottomLessCup'; payload: boolean }
  | { type: 'toggleBuffet'; payload: boolean }
  | { type: 'togglePrivateRoom'; payload: boolean }
  | { type: 'toggleWebReserve'; payload: boolean };

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
  resetFilter: () => void;
};

export const FilterRestaurantContext = createContext<FilterRestaurant>({
  filterState: initialFilterState,
  filterDispatch: () => {},
  resetFilter: () => {},
});

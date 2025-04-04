import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define the initial state using that type
// Define a type for the slice state
export interface FiltersState{
  location: string;
  beds: string;
  baths: string;
  propertyType : string;
  amenities: string[];
  availableFrom: string;
  priceRange:[number, number]|[null, null];
  squareFeet:[number, number]|[null, null];
  coordinates: [number, number];
}

// Define the initial state
interface InitialStateTypes  {
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
};

export const initialState :InitialStateTypes = {
  filters:{
    location: "Los Angeles",
    beds: "any",
    baths: "any",
    propertyType : "any",
    amenities: [],
    availableFrom: "any",
    priceRange:[null, null],
    squareFeet:[null, null],
    coordinates: [-74.5, 40], // Default coordinates for New York City
  }, 
  isFiltersFullOpen: false,
  viewMode: "grid",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setFilters, toggleFiltersFullOpen, setViewMode} = globalSlice.actions;

export default globalSlice.reducer;

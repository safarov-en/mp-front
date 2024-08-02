import { createReducer, createAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { I_Favorites } from "./types";

const initialState: I_Favorites = []
const addToFavoritesAction = createAction<number>('FAVORITES/add') 
const removeFromFavoritesAction = createAction<number>('FAVORITES/remove') 

const favoritesReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        addToFavoritesAction,
        (state: any, action: PayloadAction<number>) => [...state, action.payload]
    )
    builder.addCase(
        removeFromFavoritesAction,
        (state: any, action: PayloadAction<number>) => (
            state.filter((favoriteId: number) => favoriteId !== action.payload)
        )
    )
})

export const addToFavorites = (favoriteId: number) => (
    addToFavoritesAction(favoriteId)
)

export const removeFromFavorites = (favoriteId: number) => (
    removeFromFavoritesAction(favoriteId)
)

export default favoritesReducer
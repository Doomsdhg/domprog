import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state.interface";

export const selectBooks = (state: AppState) => state.books;

export const booksSelector = createSelector(
    selectBooks,
    (state) => state.books
)

import { createReducer, on } from "@ngrx/store";
import { BookDto } from "../book-dto.interface";
import { Book } from "../book.model";
import * as BooksActions from "./books-actions";
import { BooksState } from "./books-state.interface";

export const initialState: BooksState = {
    books: JSON.parse(localStorage.getItem('books') || '[]')
}

export const booksReducers = createReducer(
    initialState, 
    on(
        BooksActions.addBook, 
        (state: BooksState, action: BookDto) => {
            return {
                ...state,
                books: [...state.books, new Book(action)]
            }
        }
    ),
);

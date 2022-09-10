import { createReducer, on } from "@ngrx/store";
import { BookDto } from "src/app/components/book-card/book-dto.interface";
import { Book } from "src/app/components/book-card/book.model";
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
            console.log(state);
            console.log(action);
            console.log({
                ...state,
                books: [...state.books, new Book(action)]
            });
            return {
                ...state,
                books: [...state.books, new Book(action)]
            }
        }
    ),
);

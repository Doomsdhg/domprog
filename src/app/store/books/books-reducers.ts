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
        (state: BooksState, action: BookDto): BooksState => {
            return {
                ...state,
                books: [...state.books, new Book(action)]
            }
        }
    ),
    on(
        BooksActions.deleteBook, 
        (state: BooksState, action: BooksActions.DeleteBookActionProps): BooksState => {
            const newState: BooksState = JSON.parse(JSON.stringify(state));
            newState.books.splice(action.index, 1);
            return newState;
        }
    ),
    on(
        BooksActions.editBook, 
        (state: BooksState, action: BooksActions.EditBookActionProps): BooksState => {
            const newState: BooksState = JSON.parse(JSON.stringify(state));
            newState.books[action.index] = action.book;
            return newState;
        }
    ),
);

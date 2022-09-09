import { createAction, props } from "@ngrx/store";
import { Book } from "../book.model";
import { BooksState } from "./books-state.interface";

export const addBook = createAction('[Manage Book Dialog Component] Add Book', props<Book>());

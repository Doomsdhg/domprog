import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/components/book-card/book.model";

export const addBook = createAction('[Manage Book Dialog Component] Add Book', props<Book>());

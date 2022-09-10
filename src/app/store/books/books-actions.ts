import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/components/book-card/book.model";

export class DeleteBookActionProps {

    index: number;

    constructor(index: number){
        this.index = index;
    }
}

export const addBook = createAction('Add Book', props<Book>());

export const deleteBook = createAction('Delete Book', props<DeleteBookActionProps>());

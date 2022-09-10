import { createAction, props } from "@ngrx/store";
import { BookDto } from "src/app/components/book-card/book-dto.interface";
import { Book } from "src/app/components/book-card/book.model";

export class DeleteBookActionProps {

    index: number;

    constructor(index: number){
        this.index = index;
    }
}

export class EditBookActionProps {

    index: number;
    book: Book;

    constructor(book: Book, index: number){
        this.index = index;
        this.book = book;
    }
}

export const addBook = createAction('Add Book', props<BookDto>());

export const deleteBook = createAction('Delete Book', props<DeleteBookActionProps>());

export const editBook = createAction('Edit Book', props<EditBookActionProps>());

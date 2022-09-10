import { Book } from "../book-card/book.model";

export class ManageBookDialogPassData {
    book: Book;
    index: number;
  
    constructor(book: Book, index: number){
      this.book = book;
      this.index = index;
    }
}
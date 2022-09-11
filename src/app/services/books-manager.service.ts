import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import {
  addBook,
  deleteBook,
  DeleteBookActionProps,
  editBook,
  EditBookActionProps
} from 'src/app/store/books/books-actions';
import { booksSelector } from 'src/app/store/books/books-selectors';
import { BookDto } from '../components/book-card/book-dto.interface';
import { Book } from '../components/book-card/book.model';
import { AppState } from '../store/app-state.interface';
import { BooksState } from '../store/books/books-state.interface';
import { BooksStoreConstants } from '../store/books/books.constants';

@Injectable({
  providedIn: 'root',
})
export class BooksManagerService {
  public booksDataSource = new BehaviorSubject<Book[]>([]);

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(booksSelector));
  }

  public addBook(bookDto: BookDto): void {
    this.store.dispatch(addBook(bookDto));
    this.store
      .select(BooksStoreConstants.STORE_ACCESSORS.BOOKS)
      .subscribe((state: BooksState) => {
        this.saveBooksToLocalStorage(state.books);
        this.getBooks();
      });
  }

  public getBooks(): void {
    this.store
      .select(BooksStoreConstants.STORE_ACCESSORS.BOOKS)
      .subscribe((state: BooksState) => {
        this.saveBooksToLocalStorage(state.books);
        this.booksDataSource.next(state.books);
      });
  }

  public deleteBook(index: number): void {
    this.store.dispatch(deleteBook(new DeleteBookActionProps(index)));
    this.getBooks();
  }

  public saveEditingChanges(bookDto: BookDto, index: number): void {
    this.store.dispatch(editBook(new EditBookActionProps(bookDto, index)));
    this.getBooks();
  }

  private saveBooksToLocalStorage(booksList: Book[]): void {
    localStorage.setItem(
      BooksStoreConstants.STORE_ACCESSORS.BOOKS,
      JSON.stringify(booksList)
    );
  }
}

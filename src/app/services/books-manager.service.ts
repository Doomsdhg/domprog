import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { addBook } from 'src/app/store/books/books-actions';
import { booksSelector } from 'src/app/store/books/books-selectors';
import { BookDto } from '../components/book-card/book-dto.interface';
import { Book } from '../components/book-card/book.model';
import { AppState } from '../store/app-state.interface';
import { BooksState } from '../store/books/books-state.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksManagerService {

  public booksDataSource = new BehaviorSubject<Book[]>([]);

  constructor(private store: Store<AppState>){
    this.store.pipe(select(booksSelector))
  }

  public addBook(bookDto: BookDto): void {
    this.store.dispatch(addBook(bookDto));
    this.store.select('books')
    .subscribe((state: BooksState) => {
      this.saveBooksToLocalStorage(state.books);
      this.getBooks()
    })
  }

  public getBooks(): void {
    this.store.select('books')
    .subscribe((state: BooksState) => {
      this.booksDataSource.next(state.books);
    });
  }

  private saveBooksToLocalStorage(booksList: Book[]): void {
    localStorage.setItem('books', JSON.stringify(booksList));
  }
}

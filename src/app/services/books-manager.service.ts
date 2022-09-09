import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookDto } from '../components/book-card/book-dto.interface';
import { Book } from '../components/book-card/book.model';
import { addBook } from '../components/book-card/store/books-actions';
import { BooksState } from '../components/book-card/store/books-state.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksManagerService {

  constructor(private store: Store<BooksState>,){}

  public addBook(bookDto: BookDto): void {
    this.store.dispatch(addBook(bookDto));
    this.store.select('books').subscribe((books: Book[]) => {
      localStorage.setItem('books', JSON.stringify(books));
    })
  }

  public getBooks(): Observable<Book[]>{
    return this.store.select('books');
  }
}

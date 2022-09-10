import { Component, Input } from '@angular/core';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { Book } from './book.model';

@Component({
  selector: 'dmprg-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input()
  book!: Book;

  @Input()
  index!: number;

  constructor(private booksManagerService: BooksManagerService) {}

  public editBook(): void {

  }

  public deleteBook(): void {
    this.booksManagerService.deleteBook(this.index);
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { Book } from '../book-card/book.model';

@Component({
  selector: 'dmprg-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit {

  public booksList: Book[] = [];

  constructor(
    private booksManagerService: BooksManagerService,
    private changeDetectorRef: ChangeDetectorRef
    ){}

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.booksManagerService.getBooks();
    this.booksManagerService.booksDataSource
    .subscribe((books: Book[]) => {
      this.booksList = books;
      this.changeDetectorRef.detectChanges();
    })
  }
}

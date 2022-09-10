import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { ManageBookDialogPassData } from '../add-todo-dialog/manage-book-dialog-pass-data.model';
import { ManageBookDialogComponent } from '../add-todo-dialog/manage-book-dialog.component';
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

  constructor(
    private booksManagerService: BooksManagerService,
    private dialog: MatDialog
    ) {}

  public openEditingDialog(): void {
    this.dialog.open(
      ManageBookDialogComponent,
      {
        data: new ManageBookDialogPassData(this.book, this.index)
      }  
    );
  }

  public deleteBook(): void {
    this.booksManagerService.deleteBook(this.index);
  }
}

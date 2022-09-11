import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { NotifyService } from 'src/app/services/notify.service';
import { NotifyServiceConstants } from 'src/app/services/notify.service.constants';
import { ManageBookDialogPassData } from '../add-todo-dialog/manage-book-dialog-pass-data.model';
import { ManageBookDialogComponent } from '../add-todo-dialog/manage-book-dialog.component';
import { Book } from './book.model';

@Component({
  selector: 'dmprg-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  readonly DELETED_SUCCESSFULLY_MESSAGE = 'Book deleted successfully';

  @Input()
  book!: Book;

  @Input()
  index!: number;

  constructor(
    private booksManagerService: BooksManagerService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) {}

  public openEditingDialog(): void {
    this.dialog.open(ManageBookDialogComponent, {
      data: new ManageBookDialogPassData(this.book, this.index),
    });
  }

  public deleteBook(): void {
    this.booksManagerService.deleteBook(this.index);
    this.notifyService.showMessage(
      this.DELETED_SUCCESSFULLY_MESSAGE,
      NotifyServiceConstants.MESSAGE_TYPES.SUCCESS
    );
  }
}

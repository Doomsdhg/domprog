import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageBookDialogComponent } from '../add-todo-dialog/manage-book-dialog.component';

@Component({
  selector: 'dmprg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent{

  constructor(private dialog: MatDialog){}

  openDialog(): void{
    this.dialog.open(ManageBookDialogComponent);
  }
}

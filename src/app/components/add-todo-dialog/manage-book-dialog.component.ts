import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { BookDto } from '../book-card/book-dto.interface';
import { ManageBookDialogPassData } from './manage-book-dialog-pass-data.model';

@Component({
  selector: 'dmprg-manage-book-dialog',
  templateUrl: './manage-book-dialog.component.html',
  styleUrls: ['./manage-book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageBookDialogComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(
    private booksManagerService: BooksManagerService,
    private dialogRef: MatDialogRef<ManageBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: ManageBookDialogPassData
  ){}

  ngOnInit(): void {
    this.buildForms();
  }

  public get yearFormValue(): Date {
    return this.formGroup.get('year')?.value;
  }

  public get currentlyEditing(): boolean {
    return Boolean(this.data);
  }

  public handleYearChoice(year: Date, picker: MatDatepicker<Date>): void{
    this.formGroup.get('year')?.setValue(year.getFullYear());
    picker.close();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public addBook(): void {
    this.booksManagerService.addBook(this.buildBookDto());
    this.dialogRef.close();
  }

  public saveEditingChanges(): void {
    this.booksManagerService.saveEditingChanges(this.buildBookDto(), this.data!.index);
    this.dialogRef.close();
  }

  private buildBookDto(): BookDto {
    return this.formGroup.value;
  }

  private buildForms(): void {
    this.formGroup = new FormGroup({
      author: new FormControl<string>(this.data ? this.data.book.author : ''),
      bookName: new FormControl<string>(this.data ? this.data.book.bookName : ''),
      year: new FormControl<number>(this.data ? this.data.book.year : new Date().getFullYear()),
      pagesAmount: new FormControl<number>(this.data ? this.data.book.pagesAmount : 0)
    })
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { BookDto } from '../book-card/book-dto.interface';

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
    private dialogRef: MatDialogRef<ManageBookDialogComponent>
  ){}

  ngOnInit(): void {
    this.buildForms();
  }

  public get yearFormValue(): Date {
    return this.formGroup.get('year')?.value;
  }

  public handleYearChoice(year: Date, picker: MatDatepicker<Date>): void{
    this.formGroup.get('year')?.setValue(year.getFullYear());
    picker.close();
  }

  public addBook(): void {
    this.booksManagerService.addBook(this.buildBookDto());
    this.dialogRef.close();
  }

  private buildBookDto(): BookDto {
    return this.formGroup.value;
  }

  private buildForms(): void {
    this.formGroup = new FormGroup({
      author: new FormControl<string>(''),
      bookName: new FormControl<string>(''),
      year: new FormControl<number>(new Date().getFullYear()),
      pagesAmount: new FormControl<number>(0)
    })
  }
}

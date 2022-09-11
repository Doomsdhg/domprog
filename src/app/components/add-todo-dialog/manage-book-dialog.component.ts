import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksManagerService } from 'src/app/services/books-manager.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Constants } from 'src/app/services/notify.service.constants';
import { BookDto } from '../book-card/book-dto.interface';
import { ManageBookDialogPassData } from './manage-book-dialog-pass-data.model';

@Component({
  selector: 'dmprg-manage-book-dialog',
  templateUrl: './manage-book-dialog.component.html',
  styleUrls: ['./manage-book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageBookDialogComponent implements OnInit {

  readonly REQUIRED_VALIDATION_MESSAGE = "You need to fill in all fields";
  readonly ADDED_SUCCESSFULLY_MESSAGE = "Book added successfully";
  readonly EDITED_SUCCESSFULLY_MESSAGE = "Book info edited successfully";

  public formGroup!: FormGroup;

  constructor(
    private booksManagerService: BooksManagerService,
    private dialogRef: MatDialogRef<ManageBookDialogComponent>,
    private notifyService: NotifyService,
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
    if (this.formGroup.invalid) {
      this.showValidationErrors();
    } else {
      this.booksManagerService.addBook(this.buildBookDto());
      this.dialogRef.close();
      this.notifyService.showMessage(this.ADDED_SUCCESSFULLY_MESSAGE, Constants.MESSAGE_TYPES.SUCCESS);
    }
  }

  public saveEditingChanges(): void {
    if (this.formGroup.invalid) {
      this.showValidationErrors();
    } else {
      this.booksManagerService.saveEditingChanges(this.buildBookDto(), this.data!.index);
      this.dialogRef.close();
      this.notifyService.showMessage(this.EDITED_SUCCESSFULLY_MESSAGE, Constants.MESSAGE_TYPES.SUCCESS);
    }
  }

  private get customRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const empty = !Boolean(control.value);
      return empty ? {required: this.REQUIRED_VALIDATION_MESSAGE} : null;
    };
  }

  private buildBookDto(): BookDto {
    return this.formGroup.value;
  }

  private buildForms(): void {
    this.formGroup = new FormGroup({
      author: new FormControl<string>(this.data ? this.data.book.author : '', this.customRequiredValidator),
      bookName: new FormControl<string>(this.data ? this.data.book.bookName : '', this.customRequiredValidator),
      year: new FormControl<number>(this.data ? this.data.book.year : new Date().getFullYear(), this.customRequiredValidator),
      pagesAmount: new FormControl<number>(this.data ? this.data.book.pagesAmount : 0, this.customRequiredValidator)
    })
  }

  private showValidationErrors(): void {
    Object.keys(this.formGroup.controls).forEach((key: string) => {
      const controlErrors: ValidationErrors | null = this.formGroup.get(key)!.errors;
      if (controlErrors){
        Object.keys(controlErrors).forEach((errorKey: string) => {
          this.notifyService.showMessage(controlErrors[errorKey], Constants.MESSAGE_TYPES.ERROR)
        })
      }
    })
  }
}

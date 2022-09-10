import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ManageBookDialogComponent } from './components/add-todo-dialog/manage-book-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { booksReducers } from 'src/app/store/books/books-reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ManageBookDialogComponent,
    BooksListComponent,
    BookCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({books: booksReducers}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

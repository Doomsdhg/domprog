import { BookDto } from './book-dto.interface';

export class Book {
  author: string;
  bookName: string;
  year: number;
  pagesAmount: number;

  constructor(bookDto: BookDto) {
    this.author = bookDto.author;
    this.bookName = bookDto.bookName;
    this.year = bookDto.year;
    this.pagesAmount = bookDto.pagesAmount;
  }
}

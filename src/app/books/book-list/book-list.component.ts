import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  @Input() title: string = '';
  @Output() selectBook = new EventEmitter<Book>();
  books: Book[];
  private bookStoreService = inject(BookStoreService);

  constructor() {
    this.books = this.bookStoreService.getAll();
  }

  doSelect(book: Book) {
    this.selectBook.emit(book);
  }
}

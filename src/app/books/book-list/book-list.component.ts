import { Component, Input, inject } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  @Input() title: string = '';
  private bookStoreService = inject(BookStoreService);
  books$: Observable<Book[]>;

  constructor() {
    this.books$ = this.bookStoreService.getAll();
  }
}

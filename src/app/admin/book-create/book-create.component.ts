import { Component, inject } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css'
})
export class BookCreateComponent {
  bookStoreService = inject(BookStoreService);
  router = inject(Router);

  create(book: Book): void {
    this.bookStoreService.create(book).subscribe(createdBook => {
      this.router.navigate(['/books', createdBook.isbn]);
    })
    console.log(book);
  }
}

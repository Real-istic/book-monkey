import { Component, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bm-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
  book$: Observable<Book>;
  bookStoreService = inject(BookStoreService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      switchMap(isbn => this.bookStoreService.getSingle(isbn))
    )
  }

  update(book: Book) {
    this.bookStoreService.update(book).subscribe(updateBook => {
      this.router.navigate(['/books', updateBook.isbn]);
    });
  }
}

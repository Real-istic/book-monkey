import { Component, inject } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  book$: Observable<Book>;
  router = inject(Router)

  private bookStoreService = inject(BookStoreService);
  private activateRoute = inject(ActivatedRoute);

  constructor() {
    const isbn = this.activateRoute.snapshot.paramMap.get('isbn')!;
    this.book$ = this.bookStoreService.getSingle(isbn);
  }

  removeBook(isbn: string) {
    this.bookStoreService.remove(isbn).subscribe(() => {
      this.router.navigateByUrl('/books');
    });

  }
}

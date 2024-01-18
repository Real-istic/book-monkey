import { Component, inject } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  input$ = new Subject<string>();
  private bookStoreService = inject(BookStoreService);
  isLoading = false;
  results$: Observable<Book[]>;

  constructor() {
    this.results$ = this.input$
      .pipe(filter(term => term.length >= 3),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(term => this.bookStoreService.getAllSearch(term)),
        tap(() => this.isLoading = false)
      );
  }
}

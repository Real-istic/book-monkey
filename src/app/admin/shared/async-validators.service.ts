import { Injectable, inject } from '@angular/core';
import { BookStoreService } from '../../shared/book-store.service';
import { AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorsService {
  bookStoreService = inject(BookStoreService);

  constructor() { }

  isbnExists(): AsyncValidatorFn {
    return (control) => {
      return this.bookStoreService.check(control.value).pipe(
        map(exists => exists ? { isbnexists: true } : null)
      );
    }
  }
}

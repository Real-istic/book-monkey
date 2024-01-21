import { Injectable, inject } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  books: Book[] = [];
  http = inject(HttpClient);
  private apiUrl = 'https://api5.angular-buch.com';

  constructor() { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`, { responseType: 'json' }).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`, { responseType: 'json' });
  }

  remove(isbn: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/books/${isbn}`, { responseType: 'text' });
  }

  getAllSearch(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search/${term}`, { responseType: 'json' }).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  create(book: Book): Observable<Book> {
    return this.http
      .post<Book>(`${this.apiUrl}/books`, book)
  }

  update(book: Book): Observable<Book> {
    return this.http.put<Book>(
      `${this.apiUrl}/books/${book.isbn}`,
      book
    )
  }
}

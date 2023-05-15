import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Intsights } from '../interfaces/intsights.interface';

const API_URL = 'http://localhost:1337/api/data/';

@Injectable({
  providedIn: 'root'
})
export class IntsightsService {

  constructor(private http: HttpClient) { }

  getIntsightsBySourceType(sourceType: string): Observable<Intsights> {
    const url = `${API_URL}${sourceType}`;
    return this.http.get<Intsights>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError('An error occurredm, please try again')
      })
    )
  }
}

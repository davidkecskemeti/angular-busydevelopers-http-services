import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {AppError} from '../common/app-error';
import {NotFoundError} from '../common/not-found-error';
import {BandInput} from '../common/band-input';
import {throwError} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  create(resource: any) {
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  update(resource: any) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: Response) {
    if (err.status === 400) {
      return throwError(new BandInput(err.json()));
    }
    if (err.status === 404) {
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(err));
  }
}

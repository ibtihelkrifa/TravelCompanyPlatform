import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MoyenT } from '../../models/moyen-t';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<MoyenT[]> {
    return this.http.get<MoyenT[]>("http://localhost:8081/transports")
  }

  create(t: MoyenT) {
    return this.http.post<MoyenT>("http://localhost:8081/transports", t)
  }

  update(t: MoyenT) {
    return this.http.put<MoyenT>("http://localhost:8081/transports/" + t.id, t)
  }

  delete(id: Number) {
    return this.http.delete("http://localhost:8081/transports/" + id)
  }

}

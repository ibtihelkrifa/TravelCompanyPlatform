import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>("http://localhost:8081/reservations")
  }

  delete(id: any) {
    return this.http.delete("http://localhost:8081/reservations/" + id)
  }

  save(res: Reservation){
    return this.http.post<Reservation>("http://localhost:8081/reservations/create",res);
  }

}

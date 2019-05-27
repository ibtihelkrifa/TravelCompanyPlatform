import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flight } from '../../models/flight';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>('http://localhost:8081/flights');
  }
  getAllWithThumbnails(): Observable<Flight[]> {
    return this.http.get<Flight[]>('http://localhost:8081/flights-images');
  }

  create(vol: Flight) {
    return this.http.post<Flight>("http://localhost:8081/flights", vol)
  }

  update(flight: Flight) {
    return this.http.put<Flight>("http://localhost:8081/flights/" + flight.id, flight)
  }

  delete(id: Number) {
    return this.http.delete("http://localhost:8081/flights/" + id)
  }


}

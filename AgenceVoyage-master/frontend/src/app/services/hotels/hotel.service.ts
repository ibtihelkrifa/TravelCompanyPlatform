import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../../models/hotel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>("http://localhost:8081/hotels");
  }

  create(hotel: Hotel) {
    return this.http.post<Hotel>("http://localhost:8081/hotels", hotel)
  }

  update(hotel: Hotel) {
    return this.http.put<Hotel>("http://localhost:8081/hotels/" + hotel.id, hotel)
  }

  delete(id: Number) {
    return this.http.delete("http://localhost:8081/hotels/" + id)
  }

}

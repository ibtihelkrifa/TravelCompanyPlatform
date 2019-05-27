import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { City } from '../../models/city'
import { Hotel } from 'src/app/models/hotel';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:8081/cities')
  }

  getCityByName(name: string): Observable<City> {
    return this.http.get<City>("http://localhost:8081/cities/query/" + name)
  }

  create(name: string) {
    const city = new City()
    city.name = name
    return this.http.post<City>("http://localhost:8081/cities", city)
  }

  update(city: City) {
    return this.http.post<City>("http://localhost:8081/cities", city)
  }

  delete(id: Number) {
    return this.http.delete<City>("http://localhost:8081/cities/" + id)
  }

  getByCity(id: any): Observable<Hotel[]> {
    return this.http.get<Hotel[]>("http://localhost:8081/hotels/city/" + id)
  }


}

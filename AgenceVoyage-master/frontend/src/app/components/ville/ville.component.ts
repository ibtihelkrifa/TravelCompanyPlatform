import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm } from '@angular/forms';
import { VilleService } from '../../services/ville/ville.service';
import { City } from '../../models/city';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  constructor(private citiesService: VilleService, public ngxSmartModalService: NgxSmartModalService) { }

  cities$: City[]
  city: City;
  displayedColumns: string[] = ['name', 'actions'];

  ngOnInit() { this.citiesService.getAll().subscribe(data => this.cities$ = data) }

  openModal(modalName: string, city: City) {
    if (city) this.city = city
    this.ngxSmartModalService.open(modalName)
  }

  closeModal(modalName: string) { this.ngxSmartModalService.close(modalName) }

  removeCity(city: City) {
    this.citiesService.delete(city.id).subscribe(
      () => this.citiesService.getAll().subscribe(data => this.cities$ = data))
  }

  onEditSubmit(f: NgForm, id: Number) {
    const city = new City()
    city.name = f.value.namecity
    city.id = id;
    this.citiesService.update(city).subscribe(() =>
      this.citiesService.getAll().subscribe(data => {
        this.cities$ = data
        this.closeModal('editModalVille')
      }))
  }

  onCreateSubmit(f: NgForm) {
    this.citiesService.create(f.value.namecity).subscribe(() =>
      this.citiesService.getAll().subscribe(data => {
        this.cities$ = data
        this.closeModal('createModalVille')
        f.reset()
      }))
  }

}
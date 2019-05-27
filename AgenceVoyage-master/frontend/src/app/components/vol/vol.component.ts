import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Flight } from '../../models/flight';
import { VolsService } from '../../services/vols/vols.service';
import { NgForm } from '@angular/forms';
import { VilleService } from '../../services/ville/ville.service';
import { City } from '../../models/city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {

  constructor(private router: Router,
    private cityService: VilleService,
    private flightService: VolsService,
    public ngxSmartModalService: NgxSmartModalService) { }

  flights$: any
  flight: any;
  cities$: any
  displayedColumns: string[] = ['ville', 'depart', 'prix', 'places', 'actions'];

  ngOnInit() {
    this.flightService.getAll().subscribe(data => this.flights$ = data)
    this.cityService.getAll().subscribe(data => this.cities$ = data)
  }

  openModal(modalName: string, flight: Flight) {
    if (flight) this.flight = flight
    this.cityService.getAll().subscribe(data => {
      this.cities$ = data
      this.ngxSmartModalService.open(modalName)
    })
  }

  closeModal(modalName: string) { this.ngxSmartModalService.close(modalName) }

  removeFlight(f: Flight) {
    this.flightService.delete(f.id).subscribe(
      () => this.flightService.getAll().subscribe(volData => this.flights$ = volData))
  }

  onEditSubmit(f: NgForm, id: Number) {
    const city = new City()

    const cityIndex = this.cities$.findIndex((el: City) => el.id == f.value.city)

    city.id = f.value.city
    city.name = this.cities$[cityIndex].name
    const v = new Flight()
    v.id = id
    v.availablePlaces = f.value.number
    v.city = city
    v.departureDate = f.value.date;
    v.price = f.value.price;
    this.flightService.update(v).subscribe
      (() => this.flightService.getAll().subscribe(data => {
        this.flights$ = data
        this.closeModal('editModalVol')
      }))
  }

  onCreateSubmitf(f: NgForm) {
    const city = new City()
    const cityIndex = this.cities$.findIndex(el => el.id == f.value.city)

    city.id = f.value.city
    city.name = this.cities$[cityIndex].name

    const v = new Flight();
    v.availablePlaces = f.value.number;
    v.city = city;
    v.departureDate = f.value.date;
    v.price = f.value.price

    this.flightService.create(v).subscribe
      (() => this.flightService.getAll().subscribe(data => {
        this.flights$ = data
        this.closeModal('createModalVol')
        f.reset()
      }))
  }

}

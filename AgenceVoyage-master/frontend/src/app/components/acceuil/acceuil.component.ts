import { Component, OnInit } from '@angular/core';
import { VolsService } from '../../services/vols/vols.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { VilleService } from '../../services/ville/ville.service';
import { TransportService } from '../../services/transport/transport.service';
import { Flight } from 'src/app/models/flight';
import { Hotel } from 'src/app/models/hotel';
import { MoyenT } from 'src/app/models/moyen-t';
import { GoogleMapsService } from '../../services/google-maps/google-maps.service';
import { WikiService } from '../../services/wiki/wiki.service';
import { Reservation } from '../../models/reservation';
import { User } from '../../models/user';
import { ReservationService } from '../../services/reservation/reservation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  searchText: string
  showMap: Boolean = false;
  vols$: Flight[]
  vol: Flight;
  transport$: MatTableDataSource<MoyenT>
  hotels$: MatTableDataSource<Hotel>;
  sexe: string[] = [
    'femme',
    'homme'
  ];

  selectedHotel: Hotel;
  selectedTransport: MoyenT;

  hotelDisplayedColumns: string[] = ['select', 'name', 'price', 'city'];
  transportsDisplayedColumns: string[] = ['select', 'name', 'place', 'price'];

  hotelSelection = new SelectionModel<Hotel>(false, []);
  tranportSelection = new SelectionModel<MoyenT>(false, []);



  constructor(private transportService: TransportService,
    private villeService: VilleService,
    private volService: VolsService,
    private gMaps: GoogleMapsService,
    private wikiService: WikiService,
    private reservationService: ReservationService,
    public ngxSmartModalService: NgxSmartModalService,
    private notifierService: NotifierService) { }

  ngOnInit() {
    this.volService.getAllWithThumbnails().subscribe(data => this.vols$ = data)
    this.transportService.getAll().subscribe(data => this.transport$ = new MatTableDataSource(data))
  }

  renderMap(cityName: String) {
    return this.gMaps.getHtmlCode(cityName)
  }

  fetchSummary(query: String) {
    this.wikiService.fetchSummary(query).subscribe((data: WikiFormat) => this.vol.city.description = (data.query.pages[Object.keys(data.query.pages)[0]].extract.substring(0, 600) + '...'))
  }

  selectHotel(hotel) {
    this.hotelSelection.toggle(hotel)
    this.selectedHotel = hotel
  }

  selectTransport(transport) {
    this.hotelSelection.toggle(transport)
    this.selectedTransport = transport
  }

  transportFilter(filterValue: string) {
    this.transport$.filter = filterValue.trim().toLowerCase();
  }
  hotelFilter(filterValue: string) {
    this.hotels$.filter = filterValue.trim().toLowerCase();
  }

  closeModal() {
    this.ngxSmartModalService.close('myModal')
  }

  openModal(v) {
    this.vol = v;
    this.showMap = false
    this.fetchSummary(v.city.name)
    this.ngxSmartModalService.open('myModal');
    this.villeService.getByCity(v.city.id).subscribe(data => this.hotels$ = new MatTableDataSource(data))
  }

  onSubmitf(f: any) {

    const user = new User()
    user.email = f.value.email
    user.firstName = f.value.name
    user.lastName = f.value.lastname
    user.role = "user"
    user.sex = f.value.sex

    const res = new Reservation()
    res.duration = f.value.duration
    res.hotel = this.selectedHotel
    res.flight = this.vol
    res.personsCount = f.value.count
    res.transport = this.selectedTransport
    res.user = user
    res.startingDate = f.value.date
    this.reservationService.save(res).subscribe(() => {
      this.notifierService.notify('success', 'Un email de confirmation vous a été énvoyé!');
      this.closeModal()
      f.reset()
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations$: Reservation[]
  displayedColumns: string[] = ['ville', 'prix', 'personscount', 'starting', 'duration', 'hotel', 'transport', 'client', 'actions'];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getAll().subscribe(data => this.reservations$ = data)
  }

  removeReservation(reservation: Reservation) {
    this.reservationService.delete(reservation.id).subscribe(
      () => this.reservationService.getAll().subscribe(data => this.reservations$ = data))
  }

}

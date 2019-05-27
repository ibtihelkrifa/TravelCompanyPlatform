import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../services/transport/transport.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MoyenT } from '../../models/moyen-t';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  transports$: MoyenT[]
  transport: MoyenT
  displayedColumns: string[] = ['name', 'place', 'price', 'actions'];

  constructor(private transportService: TransportService,
    public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.transportService.getAll().subscribe(data => this.transports$ = data)
  }

  openModal(modalName: string, tranposrt: MoyenT) {
    if (tranposrt) this.transport = tranposrt
    this.ngxSmartModalService.open(modalName)
  }

  closeModal(modalName: string) { this.ngxSmartModalService.close(modalName) }

  removeTransport(transport: MoyenT) {
    this.transportService.delete(transport.id).subscribe(
      () => this.transportService.getAll().subscribe(data => this.transports$ = data))
  }

  onEditSubmit(f: NgForm, id: Number) {
    const t = new MoyenT()
    t.id = id;
    t.name = f.value.name;
    t.placeCount = f.value.count;
    t.price = f.value.price
    this.transportService.update(t).subscribe(() =>
      this.transportService.getAll().subscribe(data => {
        this.transports$ = data
        this.closeModal('editModalTransport')
      }))
  }

  onCreateSubmit(f: any) {
    const m = new MoyenT();
    m.placeCount = f.value.count
    m.price = f.value.price
    m.name = f.value.name
    this.transportService.create(m).subscribe(() =>
      this.transportService.getAll().subscribe(data => {
        this.transports$ = data
        this.closeModal('createModalTransport')
        f.reset()
      }))
  }



}

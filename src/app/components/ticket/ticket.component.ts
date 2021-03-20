import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticket.service';
import { Ticket } from '../../model/ticket';
import { FormControl } from '@angular/forms';
import { StateProjectEnum } from 'src/app/model/stateProjectEnum';
import swal from 'sweetalert2';
interface Status {
  value: StateProjectEnum;
  viewValue: string;
}
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  status: Status[] =
    [
      { value: StateProjectEnum.All, viewValue: "All Tickets" },
      { value: StateProjectEnum.Open, viewValue: "Open Tickets" },
      { value: StateProjectEnum.Closed, viewValue: "Closed Tickets" },
      { value: StateProjectEnum.Overdue, viewValue: "Overdue Tickets" },
      { value: StateProjectEnum.Escalated, viewValue: "Escalated Tickets" },
    ]

  public listTicker: Ticket[] = [];
  constructor(private ticketService: TicketService) { }
  private _statusForm: FormControl = new FormControl();

  ngOnInit(): void {
    this.loadListTicker();
  }

  filterTable(): void {
    const _this = this;
    this.ticketService.findAll().subscribe(listTicker => {
      this.listTicker = listTicker.filter(function (ticket) {
        if (_this._statusForm.value == 'All')
          return ticket;
        else if (ticket.state == _this._statusForm.value)
          return ticket;
      })
    })

  }

  loadListTicker(): void {
    this.ticketService.findAll().subscribe(listTicker => {
      this.listTicker = listTicker;
    })
  }

  delete(ticket: Ticket): void {
    const swallBootstrap = swal.mixin({
      buttonsStyling: false,
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-success'
      }
    });
    swallBootstrap.fire({
      cancelButtonText: 'No, cancelar',
      confirmButtonText: 'Sí, eliminar',
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      text: `Seguro que desea eliminar el ticket: ${ticket.name}`,
      title: '¿Está seguro?'
    }).then((result) => {
      if (result.value) {
        this.ticketService.delete(ticket.id).subscribe(() => {
          this.listTicker = this.listTicker.filter(result => result !== ticket);
          swal.fire('Ticket Eliminado', `${ticket.name}, eliminado con éxito`, 'success');
        });
      }
    });
  }

  public get statusForm(): FormControl {
    return this._statusForm;
  }
  public set statusForm(value: FormControl) {
    this._statusForm = value;
  }

}

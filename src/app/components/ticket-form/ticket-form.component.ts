import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PriorityEnum } from 'src/app/model/priorityEnum';
import { StateEnum } from 'src/app/model/stateEnum';
import { DealEnum } from 'src/app/model/dealEnum';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/service/ticket.service';
import swal from 'sweetalert2';
interface PriorityStatus {
  value: PriorityEnum;
  viewValue: string;
}
interface Status {
  value: StateEnum;
  viewValue: string;
}

interface DealStatus {
  value: DealEnum;
  viewValue: string;
}

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})


export class TicketFormComponent implements OnInit {

  priorityStatus: PriorityStatus[] = [
    { value: PriorityEnum.high, viewValue: "Alto" },
    { value: PriorityEnum.mid, viewValue: "Medio" },
    { value: PriorityEnum.low, viewValue: "Bajo" },
  ];

  status: Status[] =
    [
      { value: StateEnum.Open, viewValue: "Open" },
      { value: StateEnum.Closed, viewValue: "Closed" },
      { value: StateEnum.Overdue, viewValue: "Overdue" },
      { value: StateEnum.Escalated, viewValue: "Escalated" },
    ];

  dealStatus: DealStatus[] =
    [
      { value: DealEnum.mobile, viewValue: "mobile" },
      { value: DealEnum.system, viewValue: "system" },
    ]

  private _priorityForm: FormControl = new FormControl();
  private _statusForm: FormControl = new FormControl();
  private _dealForm: FormControl = new FormControl();

  private _ticket: Ticket = new Ticket;
  private _id: number;
  private _title: String;
  constructor(private ticketService: TicketService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      this._id = id;
      if (id) {
        this.loadTicket(id);
        this._title = "Modificar ticket";
      }
      else {
        this._title = "Agregar ticket";
      }
    })

  }

  public loadTicket(id: number): void {
    this.ticketService.find(id).subscribe(ticket => {
      this._ticket = ticket;
      this._priorityForm = new FormControl(ticket.priority);
      this._statusForm = new FormControl(ticket.state);
      this._dealForm = new FormControl(ticket.deal);
    })
  }

  public create(): void {
    this.ticket.priority = this._priorityForm.value;
    this.ticket.state = this._statusForm.value;
    this.ticket.deal = this._dealForm.value;
    this.ticketService.create(this.ticket).subscribe(() => {
      this.router.navigate(['/']);
      swal.fire('Operación Correcta', `Ticket creado con exito`, 'success');
    });
  }

  public update(): void {
    this.ticket.priority = this._priorityForm.value;
    this.ticket.state = this._statusForm.value;
    this.ticket.deal = this._dealForm.value;
    this.ticketService.update(this.ticket, this._id).subscribe(() => {
      this.router.navigate(['/']);
      swal.fire('Operación Correcta', `Ticket modificado con exito`, 'success');
    });

  }
  public get priorityForm(): FormControl {
    return this._priorityForm;
  }
  public set priorityForm(value: FormControl) {
    this._priorityForm = value;
  }

  public get statusForm(): FormControl {
    return this._statusForm;
  }
  public set statusForm(value: FormControl) {
    this._statusForm = value;
  }

  public get dealForm(): FormControl {
    return this._dealForm;
  }
  public set dealForm(value: FormControl) {
    this._dealForm = value;
  }

  public get ticket(): Ticket {
    return this._ticket;
  }
  public set ticket(ticket: Ticket) {
    this._ticket = ticket;
  }

  public get title(): String {
    return this._title;
  }
  public set title(title: String) {
    this._title = title;
  }
  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

}

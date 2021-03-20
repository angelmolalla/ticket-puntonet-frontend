import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [
  { path: '', component: TicketComponent },
  { path: 'ticket', component: TicketFormComponent },
  { path: 'ticket/:id', component: TicketFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

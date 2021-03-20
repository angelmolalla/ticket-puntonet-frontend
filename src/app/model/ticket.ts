import { DealEnum } from "./dealEnum";
import { PriorityEnum } from "./priorityEnum";
import { StateEnum } from "./stateEnum";

export class Ticket {
  id: number;
  name: string;
  description: string;
  state: StateEnum;
  priority: PriorityEnum;
  deal: DealEnum;
  user: String;
  dueDate: String;
}

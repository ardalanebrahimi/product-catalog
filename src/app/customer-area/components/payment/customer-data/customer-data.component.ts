import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss'],
})
export class CustomerDataComponent {
  @Input() customer: any;

  constructor() {}
}

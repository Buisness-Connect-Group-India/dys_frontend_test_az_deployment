import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-customer-history',
  standalone: false,
  templateUrl: './customer-history.component.html',
  styleUrl: './customer-history.component.scss'
})
export class CustomerHistoryComponent {

    steps = [
    {
      type: 'Open',
      title: '9127231263',
      date: new Date(),
      icon: 'close-circle'
    },
    {
      type: 'Open',
      title: '9127231262',
      date: new Date(),
      icon: 'close-circle'
    },
    {
      type: 'Close',
      title: '9127231262',
      date: new Date(),
      icon: 'check-circle'
    },
    {
      type: 'Close',
      title: '9127231262',
      date: new Date(),
      icon: 'check-circle'
    }
  ];




}

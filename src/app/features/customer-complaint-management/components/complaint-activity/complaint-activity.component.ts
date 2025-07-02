import { Component } from '@angular/core';

@Component({
  selector: 'app-complaint-activity',
  standalone: false,
  templateUrl: './complaint-activity.component.html',
  styleUrl: './complaint-activity.component.scss'
})
export class ComplaintActivityComponent {
  
steps = [
  { type: 'registered', title: 'Registered By GANMIN', icon: 'check-circle',   date: new Date('2025-06-01T10:30:00') },
  { type: 'schedule', title: 'Schedule By GANMIN', icon: 'schedule',   date: new Date('2025-06-01T10:30:00') },
  { type: 'reschedule', title: 'Re-Schedule', icon: 'solution',   date: new Date('2025-06-01T10:30:00') },
  { type: 'visit', title: 'Visit By Megat', icon: 'environment',   date: new Date('2025-06-01T10:30:00') },
  { type: 'pending', title: 'Pending', icon: 'user',   date: new Date('2025-06-01T10:30:00') },
  { type: 'close', title: 'Close', icon: 'check-circle',   date: new Date('2025-06-01T10:30:00') }
];

constructor() {}

}

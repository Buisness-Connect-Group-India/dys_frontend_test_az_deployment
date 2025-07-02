import { Component, OnInit } from '@angular/core';
interface RowData {
  state: string;
  city: string;
  zone: string;
  status: string;
  [key: string]: string; // add this to enable dynamic indexing
}
@Component({
  selector: 'app-contact-center-table',
  standalone: false,
  templateUrl: './contact-center-table.component.html',
  styleUrl: './contact-center-table.component.scss'
})
export class ContactCenterTableComponent {


}

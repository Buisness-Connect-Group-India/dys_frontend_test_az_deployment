import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-complaint-communication',
  standalone: false,
  templateUrl: './complaint-communication.component.html',
  styleUrls: ['./complaint-communication.component.scss']
})
export class ComplaintCommunicationComponent implements AfterViewInit {
  steps = [
    {
      type: 'Delivered',
      title: 'SMS Triggered On',
      date: new Date(),
      icon: 'check-circle',
      isExpanded: false,
      isOverflowing: false
    },
    {
      type: 'Undelivered',
      title: 'SMS Triggered On',
      date: new Date(),
      icon: 'close-circle',
      isExpanded: false,
      isOverflowing: false
    },
    {
      type: 'Undelivered',
      title: 'SMS Triggered On',
      date: new Date(),
      icon: 'close-circle',
      isExpanded: false,
      isOverflowing: false
    },
    {
      type: 'Delivered',
      title: 'SMS Triggered On',
      date: new Date(),
      icon: 'check-circle',
      isExpanded: false,
      isOverflowing: false
    }
  ];

  @ViewChildren('contentRef') contentTextList!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.contentTextList.forEach((elRef, i) => {
        const el = elRef.nativeElement;
        this.steps[i].isOverflowing = el.scrollHeight > el.clientHeight;
      });
    });
  }

  toggleReadMore(index: number): void {
    this.steps[index].isExpanded = !this.steps[index].isExpanded;
  }
}

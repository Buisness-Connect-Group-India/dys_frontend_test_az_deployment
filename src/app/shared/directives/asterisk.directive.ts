import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAsterisk]',
  standalone: false
})
export class AsteriskDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText('*');
    this.renderer.addClass(span, 'required_asterisk');
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.el.nativeElement, span);
  }
}
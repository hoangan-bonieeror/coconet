import { Component, Input } from '@angular/core';

export interface AccordionItem {
  title: string,
  endpoint: string
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input("items") items: AccordionItem[] = [];
}

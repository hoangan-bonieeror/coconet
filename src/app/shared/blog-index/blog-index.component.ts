import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-index',
  standalone: true,
  imports: [],
  templateUrl: './blog-index.component.html',
  styleUrl: './blog-index.component.css'
})
export class BlogIndexComponent {
  @Input('data') nodeList: NodeList = new NodeList();

  constructor() {}
  
}

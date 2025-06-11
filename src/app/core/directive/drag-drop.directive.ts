import { Directive, EventEmitter, HostBinding, HostListener, Output, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  constructor(private readonly viewRef: ViewContainerRef) { }
  @HostBinding('style.filter') filter: string = 'brightness(1)';

  @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent){
    event.preventDefault()
    event.stopPropagation()
    this.filter = 'brightness(0.97)'
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent){
    event.preventDefault()
    event.stopPropagation()
    this.filter = 'brightness(1)'
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent){
    event.preventDefault()
    event.stopPropagation()
    this.filter = 'brightness(0.95)'
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent){
    event.preventDefault()
    event.stopPropagation()
    this.filter = 'brightness(1)'
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()
    this.filter = 'brightness(0.95)'
  }


  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()
    this.filter = 'brightness(1)'
  }

  @HostListener('drop', ['$event']) onDrop(event){
    event.preventDefault()
    event.stopPropagation()
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
    this.filter = 'brightness(1)'
  }
}

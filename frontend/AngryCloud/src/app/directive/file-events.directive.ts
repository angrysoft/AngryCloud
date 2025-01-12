import { Directive, HostListener, input, output, signal } from '@angular/core';
import { FileItem } from '../models/files';

@Directive({
  selector: '[appFileEvents]',
})
export class FileEventsDirective {
  action = output<{ action: string; file: FileItem }>();
  file = input.required<FileItem>();
  preventSingleClick = signal<boolean>(false);

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
    this.preventSingleClick.set(false);
    // setTimeout(() => {
    //   if (!this.preventSingleClick()) {
    //     let actionType = 'select';
    //     if (ev.ctrlKey && !ev.shiftKey) actionType = 'select-add';
    //     else if (!ev.ctrlKey && ev.shiftKey) actionType = 'select-list';
    //     this.action.emit({ action: actionType, file: this.file() });
    //   }
    // }, 300);
    let actionType = 'select';
    if (ev.ctrlKey && !ev.shiftKey) actionType = 'select-add';
    else if (!ev.ctrlKey && ev.shiftKey) actionType = 'select-list';
    this.action.emit({ action: actionType, file: this.file() });
  }

  @HostListener('dblclick')
  onDblClick() {
    this.preventSingleClick.set(true);
    this.action.emit({ action: "open", file: this.file() });
  }
}

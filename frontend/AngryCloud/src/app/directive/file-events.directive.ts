import { Directive, HostListener, output, signal } from '@angular/core';

@Directive({
  selector: '[appFileEvents]',
})
export class FileEventsDirective {
  action = output<string>();
  preventSingleClick = signal<boolean>(false);

  @HostListener('click')
  onClick() {
    this.preventSingleClick.set(false);
    setTimeout(() => {
      if (!this.preventSingleClick()) this.action.emit('select');
    }, 500);
  }

  @HostListener('window:keydown')

  @HostListener('dblclick')
  onDblClick() {
    this.preventSingleClick.set(true);
    console.log("open");
  }
}

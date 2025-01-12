import { Component, HostListener, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileEventsDirective } from '../../../directive/file-events.directive';
import { FileItem } from '../../../models/files';
import { FileComponent } from '../file/file.component';
import { FolderComponent } from '../folder/folder.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-file-view',
  imports: [FileComponent, FolderComponent, MatIconModule, FileEventsDirective],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.scss',
})
export class FileViewComponent {
  files = input.required<FileItem[]>();
  displayedColumns = ['name', 'owner', 'date', 'size'];
  selection = new SelectionModel<FileItem>(true, [], false);

  dispatchAction(action: { action: string; file: FileItem }) {
    console.log('action: ', action);
    switch (action.action) {
      case 'open':
        break;
      case 'select':
        this.selection.clear();
        this.selection.select(action.file);
        break;
      case 'select-add':
        this.selection.toggle(action.file);
        break;
      case 'select-list':
        console.log('selection-list');
        break;
    }
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  onArrowUp(ev: KeyboardEvent) {
    console.log('moveup');
    if (this.files().length == 0) return;

    if (this.selection.isEmpty()) {
      this.selection.select(this.files().at(0) as FileItem);
    } else if (!this.selection.isSelected(this.files().at(0) as FileItem)) {
      const index: number = this.files().indexOf(
        this.selection.selected.at(-1) as FileItem
      );
      this.selection.clear();
      this.selection.select(this.files().at(index - 1) as FileItem);
    }
  }

  @HostListener('window:keydown.shift.arrowup', ['$event'])
  onSelectUp(ev: KeyboardEvent) {
    console.log('selectup');
  }

  @HostListener('window:keydown.esc')
  onUnselect() {
    console.log('unselect');
    this.selection.clear();
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  onArrowDown(ev: KeyboardEvent) {
    console.log('movedown');
    if (this.files().length == 0) return;

    if (this.selection.isEmpty()) {
      this.selection.select(this.files().at(0) as FileItem);
    } else if (!this.selection.isSelected(this.files().at(-1) as FileItem)) {
      const index: number = this.files().indexOf(
        this.selection.selected.at(-1) as FileItem
      );
      this.selection.clear()
      this.selection.select(this.files().at(index + 1) as FileItem);
    }
  }

  @HostListener('window:keydown.shift.arrowdown', ['$event'])
  onSelectDown(ev: KeyboardEvent) {
    console.log('selectdown');
  }

  @HostListener('window:keydown.enter', ['$event'])
  onOpen() {
    console.log('open');
  }
}

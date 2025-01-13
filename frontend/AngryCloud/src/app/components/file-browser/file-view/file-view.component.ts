import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileEventsDirective } from '../../../directive/file-events.directive';
import { FileItem } from '../../../models/files';
import { FilesService } from '../../../services/files.service';
import { FileComponent } from '../file/file.component';
import { FolderComponent } from '../folder/folder.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-view',
  imports: [FileComponent, FolderComponent, MatIconModule, FileEventsDirective],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.scss',
})
export class FileViewComponent {
  router = inject(Router);
  service = inject(FilesService);
  path = output<{ name: string; id: string }[]>();
  files = input.required<FileItem[]>();
  selection = new SelectionModel<FileItem>(true, [], false);
  loading = signal<boolean>(true);

  dispatchAction(action: { action: string; file: FileItem }) {
    console.log('action: ', action);
    switch (action.action) {
      case 'open':
        this.router.navigateByUrl(`/folder/${action.file.id}`);
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
      this.selection.clear();
      this.selection.select(this.files().at(index + 1) as FileItem);
    }
  }

  @HostListener('window:keydown.shift.arrowdown', ['$event'])
  onSelectDown(ev: KeyboardEvent) {
    console.log('selectdown');
  }

  @HostListener('window:keydown.enter', ['$event'])
  onOpen() {
    console.log('open on enter');
    if (this.selection.selected.length > 1 || this.selection.isEmpty()) return;
    const id = this.selection.selected.at(0)?.id;
    this.router.navigateByUrl(`/folder/${id}`);
  }
}

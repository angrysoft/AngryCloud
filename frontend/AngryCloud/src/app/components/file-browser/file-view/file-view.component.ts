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
        this.selectList(action.file);
        break;
    }
  }

  selectList(file: FileItem) {
    if (this.selection.isEmpty()) return;

    const firstSelectedFile = this.selection.selected.at(0);
    const lastSelectedFile = this.selection.selected.at(-1);
    let lowIdx = -1;
    let hiIdx = -1;
    if (firstSelectedFile) lowIdx = this.files().indexOf(firstSelectedFile);
    if (lastSelectedFile) hiIdx = this.files().indexOf(lastSelectedFile);
    const clkIdx = this.files().indexOf(file);
    if (clkIdx < lowIdx) {
      this.selectRange(clkIdx, lowIdx);
    } else if (clkIdx > hiIdx) {
      this.selectRange(hiIdx, clkIdx);
    }
  }

  selectRange(from: number, to: number) {
    this.selection.clear();
    for (let i = from; i <= to; i++) {
      this.selection.select(this.files().at(i) as FileItem);
    }
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  onArrowUp() {
    // ev.preventDefault();
    if (this.files().length == 0) return;

    if (this.selection.isEmpty()) {
      this.selection.select(this.files().at(0) as FileItem);
      return;
    }

    //FIXME find the highest idx not the last selected
    const index: number = this.files().indexOf(
      this.selection.selected.at(0) as FileItem
    );

    this.selection.clear();
    this.selection.select(this.files().at(Math.max(index - 1, 0)) as FileItem);
  }

  @HostListener('window:keydown.esc')
  onUnselect() {
    console.log('unselect');
    this.selection.clear();
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  onArrowDown() {
    // ev.preventDefault();
    console.log('movedown');
    if (this.files().length == 0) return;

    if (this.selection.isEmpty()) {
      this.selection.select(this.files().at(0) as FileItem);
      return;
    }

    //FIXME find the lowest idx not the last selected
    const index: number = this.files().indexOf(
      this.selection.selected.at(-1) as FileItem
    );

    this.selection.clear();
    this.selection.select(
      this.files().at(Math.min(index + 1, this.files().length - 1)) as FileItem
    );
  }

  @HostListener('window:keydown.shift.arrowup', ['$event'])
  onSelectUp() {
    console.log('selectup');
  }

  @HostListener('window:keydown.shift.arrowdown', ['$event'])
  onSelectDown() {
    console.log('selectdown');
  }

  @HostListener('window:keydown.enter', ['$event'])
  onOpen() {
    console.log('open on enter');
    if (this.selection.selected.length > 1 || this.selection.isEmpty()) return;
    const id = this.selection.selected.at(0)?.id;
    this.router.navigateByUrl(`/folder/${id}`, {
      state: {
        folder: id,
      },
    });
  }
}

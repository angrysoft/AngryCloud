import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FileItem } from '../../models/files';
import { FilesService } from '../../services/files.service';
import { FileToolbarComponent } from './file-toolbar/file-toolbar.component';
import { FileViewComponent } from "./file-view/file-view.component";

@Component({
  selector: 'app-file-browser',
  imports: [MatCardModule, FileToolbarComponent, FileViewComponent],
  templateUrl: './file-browser.component.html',
  styleUrl: './file-browser.component.scss',
})
export class FileBrowserComponent {
  service = inject(FilesService);
  files = signal<FileItem[]>([]);
  currentFolder = signal<string>('');
  loading = signal<boolean>(true);
  constructor() {
    this.loadFolder(this.currentFolder());
  }

  loadFolder(folder: string) {
    this.service.getFolder(folder).subscribe((resp) => {
      console.log(resp);
      if (resp.ok) {
        this.currentFolder.set(resp.data.id);
        this.files.set(resp.data.children);
      } else this.service.showError(resp);
      this.loading.set(false);
    });
  }
}

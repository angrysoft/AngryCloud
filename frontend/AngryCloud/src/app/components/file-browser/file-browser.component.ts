import {
  Component,
  inject,
  OnDestroy,
  signal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FileItem } from '../../models/files';
import { FilesService } from '../../services/files.service';
import { FileToolbarComponent } from './file-toolbar/file-toolbar.component';
import { FileViewComponent } from './file-view/file-view.component';

@Component({
  selector: 'app-file-browser',
  imports: [MatCardModule, FileToolbarComponent, FileViewComponent],
  templateUrl: './file-browser.component.html',
  styleUrl: './file-browser.component.scss',
})
export class FileBrowserComponent implements OnDestroy {
  path = signal<{ name: string; id: string }[]>([]);
  service = inject(FilesService);
  route = inject(ActivatedRoute);
  folder = signal<string>(this.route.snapshot.paramMap.get('folder') ?? '');
  files = signal<FileItem[]>([]);
  destroy = new Subject();

  constructor() {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      const id = params.get('folder') ?? '';
      this.loadFolder(id);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  setPath(path: { name: string; id: string }[]) {
    this.path.set(path);
  }

  loadFolder(folder: string) {
    this.service.getFolder(folder).subscribe((resp) => {
      if (resp.ok) {
        console.log(resp);
        this.files.set(resp.data.children);
        this.path.set(resp.data.path);
      } else this.service.showError(resp);
    });
  }
}

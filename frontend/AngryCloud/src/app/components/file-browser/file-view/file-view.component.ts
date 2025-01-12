import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileEventsDirective } from '../../../directive/file-events.directive';
import { FileItem } from '../../../models/files';
import { FileComponent } from '../file/file.component';
import { FolderComponent } from '../folder/folder.component';

@Component({
  selector: 'app-file-view',
  imports: [FileComponent, FolderComponent, MatIconModule, FileEventsDirective],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.scss',
})
export class FileViewComponent {
  files = input.required<FileItem[]>();
  displayedColumns = ['name', 'owner', 'date', 'size'];

  dispatchAction(action: string) {
    console.log(action);
  }
}

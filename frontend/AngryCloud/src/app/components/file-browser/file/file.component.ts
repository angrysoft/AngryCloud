import { Component, input } from '@angular/core';
import { FileItem } from '../../../models/files';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file',
  imports: [MatIconModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss',
})
export class FileComponent {
  data = input.required<FileItem>();
}

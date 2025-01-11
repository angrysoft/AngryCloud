import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileItem } from '../../../models/files';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-folder',
  imports: [MatIconModule, DatePipe],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent {
  data = input.required<FileItem>()
}

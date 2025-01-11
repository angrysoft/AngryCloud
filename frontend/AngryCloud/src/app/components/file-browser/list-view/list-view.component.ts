import { Component, input } from '@angular/core';
import { FileItem } from '../../../models/files';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FileComponent } from "../file/file.component";
import { FolderComponent } from "../folder/folder.component";

@Component({
  selector: 'app-list-view',
  imports: [MatTableModule, DatePipe, FileComponent, FolderComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent {
  files = input.required<FileItem[]>();
  displayedColumns = ['name', 'owner', 'date', 'size'];
}

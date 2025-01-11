import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-toolbar',
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './file-toolbar.component.html',
  styleUrl: './file-toolbar.component.scss',
})
export class FileToolbarComponent {}

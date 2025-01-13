import { Component, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-file-toolbar',
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './file-toolbar.component.html',
  styleUrl: './file-toolbar.component.scss',
})
export class FileToolbarComponent implements OnInit {
  view = input.required<string>();
  path = input.required<{ name: string; id: string }[]>();
  selectedView: FormControl<string | null>;

  constructor() {
    this.selectedView = new FormControl<string | null>(null);
  }

  ngOnInit() {
    this.selectedView.setValue(this.view());
  }
}

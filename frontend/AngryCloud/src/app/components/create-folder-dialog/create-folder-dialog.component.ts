import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-folder-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './create-folder-dialog.component.html',
  styleUrl: './create-folder-dialog.component.scss',
})
export class CreateFolderDialogComponent {
  folderName: FormControl<string | null>;

  constructor() {
    this.folderName = new FormControl(null, Validators.required);
  }
}

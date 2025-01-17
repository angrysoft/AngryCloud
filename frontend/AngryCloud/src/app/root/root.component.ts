import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { MenuActionComponent } from '../components/menu-action/menu-action.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { FilesService } from '../services/files.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateFolderDialogComponent } from '../components/create-folder-dialog/create-folder-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    SideMenuComponent,
    MenuActionComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    MatDividerModule,
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  auth = inject(AuthService);
  events = inject(EventService);
  service = inject(FilesService);
  rootFolder = signal<string>('');
  dialog = inject(MatDialog);

  constructor() {
    this.events.changes().subscribe((e) => {
      console.log(e);
      if (e.type === 'folderChange') this.rootFolder.set(e.data);
    });
  }

  createFolder() {
    const createFolderDialog = this.dialog.open(CreateFolderDialogComponent);
    createFolderDialog.afterClosed().subscribe((result) => {
      console.log(result)
      if (result && result !== false) {
        this.service
          .createFolder(this.rootFolder(), result)
          .subscribe((resp) => {
            if (resp.ok) {
              this.events.emit({
                type: 'createdNewFolder',
                data: resp.data as string,
              });
            }
          });
      }
    });
  }
}

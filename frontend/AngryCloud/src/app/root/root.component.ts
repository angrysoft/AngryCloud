import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MenuActionComponent } from '../components/menu-action/menu-action.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { FileItem } from '../models/files';
import { AuthService } from '../services/auth.service';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    SideMenuComponent,
    MenuActionComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  auth = inject(AuthService);
  route = inject(ActivatedRoute);  
}

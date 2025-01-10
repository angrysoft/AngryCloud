import { Component, inject } from '@angular/core';
import { ToolbarComponent } from "../components/toolbar/toolbar.component";
import { SideMenuComponent } from "../components/side-menu/side-menu.component";
import { FileBrowserComponent } from "../components/file-browser/file-browser.component";
import { MenuActionComponent } from "../components/menu-action/menu-action.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, SideMenuComponent, FileBrowserComponent, MenuActionComponent, MatButtonModule, MatIconModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {
  auth = inject(AuthService)
  
}

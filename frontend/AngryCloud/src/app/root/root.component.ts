import { Component } from '@angular/core';
import { MainNavComponent } from "../components/main-nav/main-nav.component";
import { MenuActionComponent } from "../components/menu-action/menu-action.component";

@Component({
  selector: 'app-root',
  imports: [MainNavComponent, MenuActionComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {

}

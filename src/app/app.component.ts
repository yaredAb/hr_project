import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SideNavComponent } from '../components/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hr_project';
}

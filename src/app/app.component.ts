import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { MotionService } from './core/services/motion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
})
export class AppComponent {
  constructor() {
    inject(ThemeService);
    inject(MotionService);
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <app-header />
    <main class="container py-24 text-center">
      <p class="eyebrow">404</p>
      <h1 class="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] my-3">Page not found</h1>
      <p class="text-muted mb-6">The page you requested doesn't exist or has been moved.</p>
      <a routerLink="/" class="btn btn--primary">Back to home</a>
    </main>
    <app-footer />
  `,
})
export class NotFoundComponent {}

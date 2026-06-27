import { Component, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ContactService } from '../../core/services/contact.service';
import { SITE, getSocialLinks } from '../../data/site.data';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly platformId = inject(PLATFORM_ID);
  private successMessageTimeout: ReturnType<typeof setTimeout> | undefined;

  readonly site = SITE;
  readonly socialLinks = getSocialLinks();
  readonly successMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      window.location.href = this.contactService.buildMailtoUrl(this.site.email, this.form.getRawValue());
    }

    this.form.reset();
    this.showSuccessMessage();
  }

  hasError(controlName: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  ngOnDestroy(): void {
    this.clearSuccessMessageTimeout();
  }

  private showSuccessMessage(): void {
    this.clearSuccessMessageTimeout();
    this.successMessage.set('Email draft opened');

    this.successMessageTimeout = setTimeout(() => {
      this.successMessage.set('');
      this.successMessageTimeout = undefined;
    }, 1000);
  }

  private clearSuccessMessageTimeout(): void {
    if (this.successMessageTimeout) {
      clearTimeout(this.successMessageTimeout);
      this.successMessageTimeout = undefined;
    }
  }
}

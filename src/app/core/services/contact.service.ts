import { Injectable } from '@angular/core';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  buildMailtoUrl(recipient: string, form: ContactPayload): string {
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }
}

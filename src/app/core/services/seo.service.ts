import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from '../../data/site.data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  updatePageMeta(options: {
    title: string;
    description: string;
    url?: string;
    image?: string;
  }): void {
    const fullTitle = `${options.title} | Hrishikesh Patkal`;
    const pageUrl = options.url ? this.absoluteUrl(options.url) : SITE.siteUrl;
    const imageUrl = this.absoluteUrl(options.image ?? SITE.ogImage);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: options.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  private absoluteUrl(pathOrUrl: string): string {
    try {
      return new URL(pathOrUrl, SITE.siteUrl).toString();
    } catch {
      return SITE.siteUrl;
    }
  }
}

import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeroSectionComponent } from '../../sections/hero-section/hero-section.component';
import { AboutSectionComponent } from '../../sections/about-section/about-section.component';
import { SkillsSectionComponent } from '../../sections/skills-section/skills-section.component';
import { ProjectsSectionComponent } from '../../sections/projects-section/projects-section.component';
import { ExperienceSectionComponent } from '../../sections/experience-section/experience-section.component';
import { EducationSectionComponent } from '../../sections/education-section/education-section.component';
import { ContactSectionComponent } from '../../sections/contact-section/contact-section.component';
import { SeoService } from '../../core/services/seo.service';
import { ScrollService } from '../../core/services/scroll.service';
import { SITE } from '../../data/site.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <app-header />
    <main id="main-content" tabindex="-1">
      <app-hero-section />
      <app-about-section />
      <app-skills-section />
      <app-experience-section />
      <app-projects-section />
      <app-education-section />
      <app-contact-section />
    </main>
    <app-footer />
  `,
})
export class HomeComponent implements OnInit, AfterViewInit {
  private readonly seo = inject(SeoService);
  private readonly scrollService = inject(ScrollService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.seo.updatePageMeta({
      title: SITE.title,
      description: SITE.tagline,
      url: SITE.siteUrl,
      image: SITE.ogImage,
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.scrollService.navigateFromHash();
  }
}

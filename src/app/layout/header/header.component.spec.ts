import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('renders five important mobile nav items in page section order', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const navItems = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item')
    );

    expect(element.querySelector('.mobile-bottom-nav')).not.toBeNull();
    expect(navItems.map((item) => item.textContent?.trim())).toEqual([
      'Home',
      'Skills',
      'Experience',
      'Projects',
      'Contact',
    ]);
    expect(navItems.some((item) => item.classList.contains('mobile-bottom-nav__item--home'))).toBeFalse();
    expect(element.querySelector('.header-menu-btn')).toBeNull();
    expect(element.querySelector('#mobile-menu')).toBeNull();
    expect(element.querySelector('.mobile-more-menu')).toBeNull();
  });

  it('moves the active glow immediately when a bottom nav item is clicked', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const projectsButton = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item')
    ).find((button) => button.textContent?.includes('Projects'));

    expect(projectsButton).withContext('Projects bottom nav button should exist').toBeDefined();
    const projectButton = projectsButton!;

    projectButton.focus();
    expect(document.activeElement).toBe(projectButton);

    projectButton.click();
    fixture.detectChanges();

    const activeButtons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item--active')
    ).map((button) => button.textContent?.trim());

    expect(activeButtons).toEqual(['Projects']);
    expect(document.activeElement).not.toBe(projectButton);
  });

  it('keeps the clicked mobile nav item active during smooth scrolling', fakeAsync(() => {
    const sections = ['home', 'projects', 'contact'].map((id) => {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
      return section;
    });

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    });

    sections[0].getBoundingClientRect = () =>
      ({ top: -1400, bottom: -600, height: 800 } as DOMRect);
    sections[1].getBoundingClientRect = () =>
      ({ top: 120, bottom: 920, height: 800 } as DOMRect);
    sections[2].getBoundingClientRect = () =>
      ({ top: 1200, bottom: 2000, height: 800 } as DOMRect);

    try {
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const contactButton = Array.from(
        element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item')
      ).find((button) => button.textContent?.includes('Contact'));

      expect(contactButton).withContext('Contact bottom nav button should exist').toBeDefined();

      contactButton?.click();
      window.dispatchEvent(new Event('scroll'));
      tick(20);
      fixture.detectChanges();

      const activeButtons = Array.from(
        element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item--active')
      ).map((button) => button.textContent?.trim());

      expect(activeButtons).toEqual(['Contact']);
    } finally {
      sections.forEach((section) => section.remove());
    }
  }));

  it('updates the active glow as the user scrolls between sections', fakeAsync(() => {
    const sections = ['home', 'projects'].map((id) => {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
      return section;
    });

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 500,
    });

    sections[0].getBoundingClientRect = () =>
      ({ top: -900, bottom: -100, height: 800 } as DOMRect);
    sections[1].getBoundingClientRect = () =>
      ({ top: 120, bottom: 920, height: 800 } as DOMRect);

    try {
      fixture.detectChanges();
      window.dispatchEvent(new Event('scroll'));
      tick(20);
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const activeButtons = Array.from(
        element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item--active')
      ).map((button) => button.textContent?.trim());

      expect(activeButtons).toEqual(['Projects']);
    } finally {
      sections.forEach((section) => section.remove());
    }
  }));

  it('maps non-tab sections to the closest important mobile nav item while scrolling', fakeAsync(() => {
    const sections = ['home', 'about'].map((id) => {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
      return section;
    });

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    });

    sections[0].getBoundingClientRect = () =>
      ({ top: -900, bottom: -100, height: 800 } as DOMRect);
    sections[1].getBoundingClientRect = () =>
      ({ top: 120, bottom: 920, height: 800 } as DOMRect);

    try {
      fixture.detectChanges();
      window.dispatchEvent(new Event('scroll'));
      tick(20);
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const activeButtons = Array.from(
        element.querySelectorAll<HTMLButtonElement>('.mobile-bottom-nav__item--active')
      ).map((button) => button.textContent?.trim());

      expect(activeButtons).toEqual(['Home']);
    } finally {
      sections.forEach((section) => section.remove());
    }
  }));
});

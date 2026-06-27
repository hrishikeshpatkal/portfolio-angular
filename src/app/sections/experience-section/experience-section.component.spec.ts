import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EXPERIENCES } from '../../data/experience.data';
import { ExperienceSectionComponent } from './experience-section.component';

class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

describe('ExperienceSectionComponent', () => {
  let fixture: ComponentFixture<ExperienceSectionComponent>;

  beforeEach(async () => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });

    await TestBed.configureTestingModule({
      imports: [ExperienceSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceSectionComponent);
  });

  it('renders each role in the experience list', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.experience-timeline')).not.toBeNull();
    expect(element.querySelector('.experience-timeline__rail')).toBeNull();
    expect(element.querySelectorAll('.experience-timeline__item').length).toBe(EXPERIENCES.length);
    expect(element.querySelector('.experience-card')).toBeNull();
    expect(element.querySelector('.experience-timeline__item--current')).not.toBeNull();
    expect(element.querySelector('.experience-timeline__status')).not.toBeNull();
  });

  it('keeps role, company, dates, metrics, and highlights visible', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    for (const experience of EXPERIENCES) {
      expect(element.textContent).toContain(experience.role);
      expect(element.textContent).toContain(experience.company);
      expect(element.textContent).toContain(experience.startDate);
      expect(element.textContent).toContain(experience.endDate);
      expect(element.textContent).toContain(experience.summary);

      for (const highlight of experience.highlights) {
        expect(element.textContent).toContain(highlight);
      }
    }

    expect(element.querySelectorAll('.experience-timeline__metric').length).toBe(
      EXPERIENCES.reduce((total, experience) => total + experience.metrics.length, 0),
    );
  });
});

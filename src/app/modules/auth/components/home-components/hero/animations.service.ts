import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  initScrollAnimations() {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const el = entry.target as HTMLElement;

          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';

        }

      });

    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    document
      .querySelectorAll('.feature-card, .product-card, .pricing-card, .stat-item')
      .forEach(el => {

        const element = el as HTMLElement;

        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';

        observer.observe(element);

      });

  }

}
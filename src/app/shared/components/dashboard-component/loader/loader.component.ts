import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  standalone: true, // Required if this component is standalone
  template: `
    <!-- LOADER -->
    <div class="loader"></div>
  `,
  styles: [`
    .loader {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 1px solid var(--color-bg-primary);
      border-top-color: transparent;
      animation: spin 1.2s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `],
})
export class LoaderComponent {}
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/translate/language.service';
import { ButtonComponent } from '../button/button.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    LanguageSelectorComponent
  ]
})
export class NavbarComponent implements AfterViewInit {

  menuOpen = false;
  isScrolled = false;
  activeSection = 'inicio';

  constructor(public langService: LanguageService) {}

  navItems: NavItem[] = [
    { id: 'inicio', label: 'NAV.HOME' },
    { id: 'productos', label: 'NAV.SOLUTIONS' },
    { id: 'caracteristicas', label: 'NAV.BENEFITS' },
    { id: 'cas-automation', label: 'NAV.CAS' },
    { id: 'modulos', label: 'NAV.COS' },
    { id: 'precios', label: 'NAV.LICENSES' },
    { id: 'contacto', label: 'NAV.CONTACT' }
  ];

  ngAfterViewInit() {
    setTimeout(() => this.detectActiveSection());
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  changeLang(lang: 'es' | 'en') {
    this.langService.setLang(lang);
    this.closeMenu();
  }

  scrollTo(sectionId: string) {

    const element = document.getElementById(sectionId);

    if (!element) return;

    const navbarHeight = 80;

    const offset =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });

    this.activeSection = sectionId;

    this.closeMenu();
  }

  @HostListener('window:scroll')
  detectActiveSection() {

    const scrollPosition = window.scrollY + 120;

    this.isScrolled = window.scrollY > 40;

    for (const section of this.navItems) {

      const element = document.getElementById(section.id);

      if (!element) continue;

      const offset = element.offsetTop;
      const height = element.offsetHeight;

      if (
        scrollPosition >= offset &&
        scrollPosition < offset + height
      ) {
        this.activeSection = section.id;
      }
    }
  }

}
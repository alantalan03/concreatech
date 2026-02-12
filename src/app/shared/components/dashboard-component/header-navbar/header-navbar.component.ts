/**
 *!	 Componente HeaderNavbarComponent
 *!
 *!	 Este componente representa una barra de navegación ubicada en la cabecera de la aplicación, permitiendo gestionar idiomas, temas y navegación.
 *!
 *!	 Propiedades de Entrada:
 *!	   - `MenuBlock1` (Input): Array de menús de tipo `Menu[]`, representando los elementos de navegación primaria.
 *!	   - `company` (Input): Nombre de la compañía.
 *!	   - `version` (Input): Versión actual de la aplicación.
 *!	   - `roll` (Input): Rol del usuario actual.
 *!	   - `langCheckbox` (Input): Controla la visibilidad del menú de selección de idioma.
 *!	   - `appearanceCheckbox` (Input): Controla la visibilidad del menú de selección de apariencia (tema).
 *!
 *!	 Variables Internas:
 *!	   - `leftCollpase`: Booleano que controla el colapso del menú lateral.
 *!	   - `fullfillmentCheckbox`: Controla la visibilidad de opciones específicas de cumplimiento.
 *!	   - `url`: Almacena la URL de navegación actual.
 *!	   - `ts`: Servicio de traducción (`TranslateService`).
 *!	   - `localService`: Servicio de almacenamiento local (`LocalStorageService`).
 *!	   - `sidebarService`: Servicio de barra lateral (`SidebarService`).
 *!	   - `routes`: Servicio de enrutador (`Router`).
 *!	   - `MenuBlock2`: Bloque de menú adicional para enlaces secundarios.
 *!
 *!	 Getters:
 *!	   - `GetLang`: Devuelve el idioma guardado en `localStorage`.
 *!
 *!	 Métodos Principales:
 *!	   - `collapseMenu(time?: number)`: Alterna el estado de colapso del menú, ocultando las opciones de idioma y apariencia.
 *!	   - `ChangeLang(lang: string)`: Cambia el idioma guardado en `localStorage`.
 *!	   - `ChangeMode(theme: string)`: Cambia el tema (modo oscuro o claro) en `localStorage`.
 *!	   - `ChangeOrders()`: Redirige a la página de órdenes.
 *!	   - `ChangeRequest()`: Redirige a la página de solicitudes.
 *!	   - `ChangeInventory()`: Redirige a la página de inventario.
 *!	   - `abrirMenu()`: Abre el menú de la barra lateral.
 *!	   - `GetChecked()`: Restablece el estado de los checkboxes de menú y cierra el menú de la barra lateral.
 *!
 *!	 Decoradores y Componentes Importados:
 *!	   - `selector`: Define el selector del componente (`header-navbar`).
 *!	   - `standalone`: Permite que el componente sea utilizado de manera independiente.
 *!	   - `imports`: Incluye módulos y componentes necesarios.
 *!
 *!	 Ejemplo de Uso:
 *!	 ```html
 *!	 <header-navbar [MenuBlock1]="primaryMenu" company="Mi Empresa" version="1.0" roll="admin"
 *!	     [langCheckbox]="true" [appearanceCheckbox]="true">
 *!	 </header-navbar>
 *!	 ```
 *!
 *!	 Desarrollado por:
 *!	 Alan Cortez
 *!
 *!	 Fecha:
 *!	 30/10/2024
 */
// * Angular
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// * Services
import { LocalStorageService } from 'src/app/core/services/translate/localstorage.service';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
// * Pipe
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
// * Components
// import { Menu } from '../sidebar/sidebar.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';

@Component({
	selector: 'header-navbar',
	imports: [
		CommonModule,
		TranslatePipe,
		RouterModule,
		FormsModule,
		NotificationsComponent,
	],
	templateUrl: './header-navbar.component.html',
	styleUrl: './header-navbar.component.css',
})
export class HeaderNavbarComponent {
	@Input() MenuBlock1 = [];
	@Input() company: string = '';
	@Input() version: string = '';
	@Input() roll: string = '';
	@Input() langCheckbox: boolean = false;
	@Input() appearanceCheckbox: boolean = false;
	leftCollpase: boolean = false;
	fullfillmentCheckbox: boolean = false;
	url: string = '';
	public ts = inject(TranslateService);
	public localService = inject(LocalStorageService);
	public sidebarService = inject(SidebarService);
	public routes = inject(Router);
	// * Get Lang From localStorage
	get GetLang() {
		return localStorage.getItem('lang') || '';
	}

	collapseMenu(time?: number) {
		setTimeout(() => {
			this.leftCollpase = !this.leftCollpase;
		}, time);
		this.langCheckbox = false;
		this.appearanceCheckbox = false;
	}

	// ? Menu 2 --------->
	MenuBlock2 = [
		{
			txt: 'menu.version',
			icon: 'version',
			router: './version',
		},
	];
	// ? Change Lang
	ChangeLang(lang: string) {
		if (lang === 'es') {
			localStorage.setItem('lang', lang);
		} else {
			localStorage.setItem('lang', 'en');
		}
	}
	// ? Change Mode
	ChangeMode(theme: string) {
		if (theme === 'light') {
			localStorage.setItem('theme', theme);
		} else {
			localStorage.setItem('theme', 'dark');
		}
	}
	ChangeOrders() {
		this.routes.navigateByUrl('dashboard/orders');
	}
	ChangeRequest() {
		this.routes.navigateByUrl('dashboard/request');
	}
	ChangeInventory() {
		this.routes.navigateByUrl('dashboard/inventory');
	}
	abrirMenu() {
		this.sidebarService.collapse = false;
	}
	GetChecked() {
		if (this.sidebarService.collapse === true) {
			this.sidebarService.collapse = false;
		}

		this.MenuBlock1.forEach((menu) => {
			menu.check = false;
		});
		// this.MenuBlock2.forEach( menu => {
		// 	menu.check = false;
		// })
		this.langCheckbox = false;
		this.appearanceCheckbox = false;
		this.fullfillmentCheckbox = false;
	}
}

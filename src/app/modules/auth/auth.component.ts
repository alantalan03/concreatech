// * Angular
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/shared/components/dashboard-component/footer/footer.component';
import { NavbarComponent } from 'src/app/shared/components/dashboard-component/navbar/navbar.component';
import { environment } from 'src/environments/environment';
// * Components

@Component({
	selector: 'app-auth',
	imports: [RouterOutlet, CommonModule, NavbarComponent,FooterComponent],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss',
	standalone:true
})
export default class AuthComponent implements OnInit {
	private envName: string = environment.envName;
	theme = localStorage.getItem('theme');
	// * Inject Services
	ngOnInit() {
	}
}

import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		const user = this.authService.getUserData(); // Obtener usuario autenticado

		if (!user) {
			this.router.navigate(['/auth/login']); // Si no está autenticado, redirigir al login
			return false;
		}

		if (user.data_company.id_user_type === 2) {
			return true; // El usuario es administrador, permitir acceso
		}

		this.router.navigate(['/403']); // Si no es admin, redirigir a 403
		return false;
	}
}

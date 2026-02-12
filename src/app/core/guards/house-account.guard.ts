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
export class HouseAccountGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		const user = this.authService.getUserData(); // Obtener usuario autenticado
		const userType = user?.data_company?.id_user_type; // Evitar errores si user o data_company es undefined

		if (!userType) {
			this.router.navigate(['/auth/login']); // Redirigir si no está autenticado
			return false;
		}

		// Permitir acceso a SuperAdmins, Admins y Soporte
		
		if ([1, 2, 7].includes(userType)) {
			return true;
		}

		// Si es una cuenta de casa (id_user_type === 6), restringir acceso a "/dashboard/company"
		if (userType === 6) {
			if (state.url.includes('/dashboard/company')) {
				this.router.navigate(['/403']);
				return false;
			}
			return true; // Permitir acceso a otras rutas
		}

		// Si no pertenece a ninguno de los roles permitidos, bloquear acceso
		this.router.navigate(['/403']);
		return false;
	}
}

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
export class RoleGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		const user = this.authService.getUserData();
		const userType = user?.data_company?.id_user_type;
		const allowedRoles: number[] = route.data['roles'] || [];

		if (!userType) {
			this.router.navigate(['/auth/login']);
			return false;
		}

		if (allowedRoles.includes(userType)) {
			return true;
		}

		this.router.navigate(['/403']);
		return false;
	}
}

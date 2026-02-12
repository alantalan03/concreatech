import {
	ComponentFixture,
	TestBed,
	tick,
	fakeAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { AlertsComponentComponent } from './alerts-component.component';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { ErrorService } from 'src/app/core/services/error-service.service';
import { of } from 'rxjs';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

describe('Alerts Component', () => {
	let component: AlertsComponentComponent;
	let fixture: ComponentFixture<AlertsComponentComponent>;
	let authService: UserAuthService;
	let translate: TranslateService;
	let errorService: ErrorService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [],
			imports: [
				ReactiveFormsModule,
				RouterTestingModule,
				AlertsComponentComponent, // Agrega AlertsComponentComponent aquí
			],
			providers: [
				UserAuthService,
				TranslateService,
				ErrorService,
				provideHttpClient(withInterceptorsFromDi()),
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AlertsComponentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should close the alert when closeAlert() is called', () => {
		component.showAlert = true;
		component.closeAlert();
		expect(component.showAlert).toBeFalsy();
	});
});

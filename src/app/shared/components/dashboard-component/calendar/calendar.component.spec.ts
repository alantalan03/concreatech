import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { ErrorService } from 'src/app/core/services/error-service.service';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { AlertsComponentComponent } from '../alerts-component/alerts-component.component';
import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('CalendarComponent', () => {
	let component: CalendarComponent;
	let fixture: ComponentFixture<CalendarComponent>;
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
		fixture = TestBed.createComponent(CalendarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

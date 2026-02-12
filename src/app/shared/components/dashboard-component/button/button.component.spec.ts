import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonWarehouseComponent } from './button.component';

describe('ButtonWarehouseComponent', () => {
	let component: ButtonWarehouseComponent;
	let fixture: ComponentFixture<ButtonWarehouseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ButtonWarehouseComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ButtonWarehouseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set default values for inputs', () => {
		expect(component.buttonClass).toBe('btn-sm-primary');
		expect(component.label).toBe('');
		expect(component.icon).toBe('');
		expect(component.disabled).toBe(false);
	});

	it('should render button with correct class', () => {
		const compiled = fixture.nativeElement;
		expect(
			compiled.querySelector('button').classList.contains('btn-sm-primary')
		).toBeTruthy();
	});

	it('should render label inside button', () => {
		const label = 'Test Label';
		component.label = label;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('label').textContent).toContain(label);
	});

	it('should render icon inside button if icon is provided', () => {
		const iconUrl = 'test-icon.png';
		component.icon = iconUrl;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('img').src).toContain(iconUrl);
	});

	it('should disable button when disabled input is true', () => {
		component.disabled = true;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('button').disabled).toBeTruthy();
	});
});

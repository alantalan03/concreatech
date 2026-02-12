import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'phoneFormat',
})
export class PhonePipe implements PipeTransform {
	transform(value: string | number): string {
		const phone = value.toString().replace(/\D/g, '');
		if (phone.length === 12) {
			return `+${phone.slice(0, 2)} (${phone.slice(2, 5)})-${phone.slice(5, 8)}-${phone.slice(8)}`;
		}

		// fallback: devuelve sin formato si no tiene 10 dígitos
		return value.toString();
	}
}

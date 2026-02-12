import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'date',
})
export class DatePipe implements PipeTransform {
	transform(value: any, format: string = 'shortDate'): any {
		if (!value) return '---';

		const date = new Date(value);

		if (isNaN(date.getTime())) return value; // Si no es fecha válida, regresamos el valor original

		switch (format) {
			case 'shortDate':
				return date.toLocaleDateString();
			case 'fullDate':
				return date.toLocaleDateString(undefined, {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
			case 'time':
				return date.toLocaleTimeString();
			case 'datetime':
				return date.toLocaleString();
			case 'customShort': // <--- NUEVO CASO PARA TU FORMATO
				return this.formatCustomShort(date);
			default:
				return date.toLocaleDateString();
		}
	}

	private formatCustomShort(date: Date): string {
		const day = date.getDate();
		const monthNames = [
			'ene',
			'feb',
			'mar',
			'abr',
			'may',
			'jun',
			'jul',
			'ago',
			'sep',
			'oct',
			'nov',
			'dic',
		];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();

		let hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'p.m.' : 'a.m.';

		hours = hours % 12 || 12; // convierte 0 a 12
		const formattedHour = hours.toString().padStart(2, '0');

		return `${day} ${month} ${year}, ${formattedHour}:${minutes} ${ampm}`;
	}
}

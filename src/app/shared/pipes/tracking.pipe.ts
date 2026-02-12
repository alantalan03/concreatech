import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'trackingFormat',
})
export class TrackingPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    // Convertimos a string y eliminamos espacios
    const cleanStr = value.toString().replace(/\s+/g, '');

    // Insertamos guiones cada 3 caracteres (letras o números)
    return cleanStr.replace(/(.{3})(?=.)/g, '$1-');
  }
}

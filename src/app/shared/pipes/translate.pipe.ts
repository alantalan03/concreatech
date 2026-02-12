// * Angular
import { Pipe, PipeTransform } from '@angular/core';
/*
note:
    instal npm install typings -g --save-dev
    npm install @types/node --save-dev
    in tsconfig.app.json add the next line in "compilerOptions"
    "compilerOptions":{
        "types": [ "node" ],
    }
},
*/

@Pipe({
	name: 'translate',
	standalone: true,
})
export class TranslatePipe implements PipeTransform {
	transform(translateKey: string | undefined, lang: string): string {
		if (!translateKey) {
			return '';
		}

		const currentLang = lang || localStorage.getItem('lang') || 'es';

		const translations = require(`../../../assets/lang/${currentLang}.json`); // ../../../assets/languaje/${currentLang}.json`

		const keys = translateKey.split('.');

		let translation = translations;
		for (const key of keys) {
			if (translation && translation.hasOwnProperty(key)) {
				translation = translation[key];
			} else {
				translation = translateKey;
				break;
			}
		}
		return translation || translateKey;
	}
}
